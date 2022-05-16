from firebase_admin.messaging import Message, Notification
from fcm_django.models import FCMDevice
from django.db.models.expressions import Case, When
from rest_framework.decorators import action
from fcm_django.api.rest_framework import FCMDeviceViewSet

from rest_framework import viewsets, status
import datetime
# import googlemaps
from math import sin, cos, radians, degrees, acos

from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

from home.models import (
    User,
    Badge,
    Category,
    CheckIn,
    Deal,
    Description,
    Location,
    FCMNotification,
    Restaurant,
    Timeline,
    User_Badge,
)
from .serializers import (
    BadgeSerializer,
    CategorySerializer,
    CheckInGetSerializer,
    CheckInSerializer,
    DealGetSerializer,
    DealSerializer,
    DescriptionSerializer,
    DistanceSerializer,
    LocationSerializer,
    NearbyPlacesAPISerializer,
    FCMNotificationSerializer,
    RestaurantSerializer,
    TimelineSerializer,
    User_BadgeSerializer,
    CustomFCMDeviceSerializer
)
from rest_framework import authentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.measure import Distance

from home.api.v1.serializers import (
    SignupSerializer,
    UserSerializer,
)

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
import json
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)

        # add device token for FCM push notification
        if request.data.get('device_token') is not None and request.data.get('type') is not None :
            if len(FCMDevice.objects.filter(registration_id=request.data.get('device_token'))) == 0:                
                # add item into fcm_device_token
                fcm_device_token = CustomFCMDeviceSerializer(
                data={"registration_id": request.data.get('device_token'), "type": request.data.get('type'), "user": user.id, "active":True})
                fcm_device_token.is_valid(raise_exception=True)
                fcm_device_token.save()
            else: 
                return Response({'err': 'Other Device Token is already Exist!'}, HTTP_400_BAD_REQUEST)    

        restaurant = Restaurant.objects.filter(user=user)
        if (restaurant):
            restaurant_serializer = RestaurantSerializer(restaurant, many=True)
            return Response({"token": token.key, "user": user_serializer.data, "restaurant": restaurant_serializer.data})
        else:
            return Response({"token": token.key, "user": user_serializer.data})


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        user = None
        user_id = request.user.id
        if user_id:
            user = User.objects.get(id=user_id)

        if user:
            kwarg_field: str = self.lookup_url_kwarg or self.lookup_field
            self.kwargs[kwarg_field] = user.id
            return self.update(request, *args, **kwargs)


class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = Location.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['address']


class RestaurantViewSet(viewsets.ModelViewSet):
    serializer_class = RestaurantSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = Restaurant.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['name']

    def create(self, request, *args, **kwargs):
        restaurant = None
        user_id = request.user.id
        if user_id:
            restaurant = Restaurant.objects.get(user_id=user_id)

        if restaurant:
            kwarg_field: str = self.lookup_url_kwarg or self.lookup_field
            self.kwargs[kwarg_field] = restaurant.id
            return self.update(request, *args, **kwargs)
        else:
            return self.create(request, *args, **kwargs)


class RestaurantNearByViewSet(viewsets.ModelViewSet):
    serializer_class = NearbyPlacesAPISerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = Restaurant.objects.all()

    def list(self, request, *args, **kwargs):
        serializer = NearbyPlacesAPISerializer(data=request.query_params)
        if serializer.is_valid():
            point_of_user = GEOSGeometry("POINT({} {})".format(
                request.query_params['longitude'], request.query_params['latitude']))
            max_distance = request.query_params['max_distance']
            # queryset = Deal.objects.filter(
            #     restaurant__location__point__distance_lte=(
            #         point_of_user, Distance(km=max_distance)),
            # )
            queryset = Deal.objects.all()
            serializer = DealGetSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class DealViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = DealSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = Deal.objects.all()

    def list(self, request):
        user_id = request.user.id
        queryset = Deal.objects.filter(user_id=user_id)
        serializer = DealGetSerializer(queryset, many=True)
        return Response(serializer.data)


class DealFeaturedViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = DealGetSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = Deal.objects.filter(featured=True)


class DealFeaturedViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = DealGetSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = Deal.objects.filter(featured=True)


class DealFavoritesViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = DealGetSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        result = (CheckIn.objects
                  .filter(user_id=self.request.user.id)
                  .values('deal__id')
                  .annotate(dcount=Count('deal__id'))
                  .order_by("-dcount")
                  )
        deal_id_list = []
        for deal in result:
            deal_id_list.append(deal['deal__id'])
        preserved = Case(*[When(id=id, then=pos)
                         for pos, id in enumerate(deal_id_list)])
        return Deal.objects.filter(id__in=deal_id_list).order_by(preserved)


class DealSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        if request.query_params.get('name_only'):
            return ['name']
        return super(DealSearchFilter, self).get_search_fields(view, request)


class DealGetViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = DealGetSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = Deal.objects.all()
    filter_backends = [DjangoFilterBackend,
                       DealSearchFilter, filters.OrderingFilter]
    filter_fields = ('name', 'category__name',
                     'restaurant__id', 'restaurant__name')
    search_fields = ['name', 'restaurant__name',
                     'restaurant__location__address', 'restaurant__location__geolocation']
    ordering_fields = ['name', 'price', 'reduced_price', 'created_at']


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = Category.objects.all()


class TimelineViewSet(viewsets.ModelViewSet):
    serializer_class = TimelineSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = Timeline.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['restaurant__id']

    def list(self, request):
        user = request.user
        if (user.user_role == 2):
            try:
                queryset = Timeline.objects.filter(
                    restaurant_id=user.restaurant.id)
                serializer = TimelineSerializer(queryset, many=True)
                return Response(serializer.data)
            except:
                return Response([])
        else:
            search_fields = ['name', 'restaurant__location__address', 'restaurant__location__state',
                             'restaurant__location__city', 'restaurant__location__point', 'category__name']
            ordering_fields = ['name']
            ordering = ['name']
            return Response([])

class TimelineCustomerViewSet(viewsets.ModelViewSet):
    serializer_class = TimelineSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = Timeline.objects.all()

    def get_queryset(self):           
        try:
            result = (Timeline.objects
                  .filter(restaurant_id=self.kwargs['id'])                  
                  )
            print(self.kwargs['id'])
            return result
        except:
            return Response([])

class User_BadgeViewSet(viewsets.ModelViewSet):
    serializer_class = User_BadgeSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = User_Badge.objects.all()

    def list(self, request):
        user_id = request.user.id

        queryset = User_Badge.objects.filter(user_id=user_id)
        serializer = User_BadgeSerializer(queryset, many=True)
        return Response(serializer.data)


# fcm firebase
message = Message(
    notification=Notification(title="title", body="text", image="url"))

class FCMNotificationViewSet(viewsets.ModelViewSet):
    serializer_class = FCMNotificationSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = FCMNotification.objects.all()

    def list(self, request):
        user_id = request.user.id
        queryset = Timeline.objects.filter(user_id=user_id)
        serializer = TimelineSerializer(queryset, many=True)
        return Response(serializer.data)

    

class BadgeViewSet(viewsets.ModelViewSet):
    serializer_class = BadgeSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = Badge.objects.all()


class CheckInViewSet(viewsets.ModelViewSet):
    serializer_class = CheckInSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = CheckIn.objects.all()

    def create(self, request):
        serializer_class = CheckInSerializer
        deal = Deal.objects.get(
            id=request.data.get('deal'))
        restaurant_id = deal.restaurant.id
        user_id = request.user.id

        # send message to vendor start

        message = Message(data={'title':'title', 'body':'body'})
        vendor_device = FCMDevice.objects.filter(user_id=user_id)
        if(len(vendor_device) != 0):
            vendor_device[0].send_message(message)

        # send message to vendor end

        if len(CheckIn.objects.filter(created_at__gte=(datetime.datetime.now() - datetime.timedelta(seconds=7200)), restaurant_id=restaurant_id)) > 0:
            return Response({'error': 'Unable to check-in again for another 2 hours. You can check-in at other vendors.'})
        else:
            serializer = self.serializer_class(
                data=request.data, context={"request": request}
            )
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

            checkins = CheckIn.objects.filter(user=user_id)
            badge_names = []
            today = datetime.date.today()

            # User_Badge: Getting Started
            if len(checkins) == 1:
                badge_names.append('Getting Started')

            # User_Badge: Hopper
            _count_bars_in_one_day = checkins.filter(
                created_at__date=today, restaurant__name__icontains='bar')
            if(len(_count_bars_in_one_day) == 2):
                badge_names.append('Hopper')

            # User_Badge: Double Tap
            _count_places_in_one_day = checkins.filter(
                created_at__date=today, restaurant_id=restaurant_id)
            if(len(_count_places_in_one_day) == 2):
                badge_names.append('Double Tap')

            # User_Badge: Explorer & Cartagropher
            _count_distinct_places = checkins.filter(
                user=user_id).distinct('restaurant_id').count()
            if _count_distinct_places == 5:
                badge_names.append('Explorer')
            elif _count_distinct_places == 10:
                badge_names.append('Cartagropher')

            # User_Badge: Back to back
            yesterday = today - datetime.timedelta(days=1)
            _count_yesterday_checkins = checkins.filter(
                created_at__date=yesterday).count()
            if _count_yesterday_checkins > 0:
                badge_names.append('Back to back')

            # User_Badge: Hat-trick
            the_day_before_yesterday = today - datetime.timedelta(days=2)
            _count_before_yesterday_checkins = checkins.filter(
                created_at__date=the_day_before_yesterday).count()
            if _count_before_yesterday_checkins > 0:
                badge_names.append('Hat-trick')

            # User_Badge: San Francisco where's your disco
            _count_places_in_SanFrancisco = checkins.filter(
                restaurant__location__address__icontains='San Francisco')
            if(len(_count_places_in_SanFrancisco) == 15):
                badge_names.append('San Francisco where\'s your disco')

            # User_Badge: Gulper
            current_time = datetime.datetime.now().time()
            weekday = datetime.datetime.today().strftime("%A")
            goodTimelines = Timeline.objects.filter(
                restaurant=restaurant_id, weekday=weekday, time_from__lte=current_time, time_to__gte=current_time)
            if len(goodTimelines) > 0:
                badge_names.append('Gulper')

            new_badges = []
            for i in range(len(badge_names)):
                badge_data = Badge.objects.filter(name=badge_names[i])
                badge = User_Badge.objects.filter(
                    user=user_id, badge=badge_data[0].id)
                if len(badge) == 0:
                    serializer_user_badge = User_BadgeSerializer(
                        data={"user": user_id, "badge": badge_data[0].id, "shown": True})
                    serializer_user_badge.is_valid(raise_exception=True)
                    serializer_user_badge.save()
                    new_badges.append(badge_data[0])

            if len(new_badges) == 0:
                return Response({
                    'deal': serializer.data['deal'],
                    'price': serializer.data['price'],
                    'new_added_badge': {}
                })
            else:
                return Response({
                    'deal': serializer.data['deal'],
                    'price': serializer.data['price'],
                    'new_added_badge': [{
                        'description': badge.description,
                        'id': badge.id,
                        'img_url': badge.img_url.name,
                        'name': badge.name
                    } for badge in new_badges]
                })

    def get_queryset(self):
        checkins = CheckIn.objects.all()
        user = self.request.user
        if(user.user_role == 1):
            checkins = checkins.filter(user=user)
        else:
            checkins = checkins.filter(restaurant_id=user.restaurant.id)

        return checkins


class DescriptionViewSet(viewsets.ModelViewSet):
    serializer_class = DescriptionSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)
    queryset = Description.objects.all()

class CustomFCMDeviceViewSet(FCMDeviceViewSet):
    serializer_class = CustomFCMDeviceSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    # permission_classes = (IsAuthenticated,)
    queryset = FCMDevice.objects.all()

    
class LogoutViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (IsAuthenticated,)

    def create(self, request):        
        request.user.auth_token.delete()
        FCMDevice.objects.filter(user_id=request.user.id).delete()
        return Response({"detail": "Successfully logged out."},
                            status=status.HTTP_200_OK)

def calc_dist(lat_a, long_a, lat_b, long_b):
    lat_a = radians(lat_a)
    lat_b = radians(lat_b)
    distance = (sin(lat_a) * sin(lat_b) +
                cos(lat_a) * cos(lat_b) * cos(long_a - long_b))
    return degrees(acos(distance)) * 69.09

class RestaurantDistanceViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""
    serializer_class = DistanceSerializer
    authentication_classes = (
        # authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        data = request.data
        distance = calc_dist(float(data['lat_a']), float(data['long_a']), float(data['lat_b']), float(data['long_b']))
        # gmaps = googlemaps.Client(key='AIzaSyBX5iRh7C7MBlFYlK3ia2G0bfMLbyYCvOk')
        # my_dist = gmaps.distance_matrix('Delhi','Mumbai')['rows'][0]['elements'][0]
        # return Response({"distance": distance, "my_dist": my_dist })
        return Response({"distance": distance })