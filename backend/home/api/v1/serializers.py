from django.conf import settings
from django.contrib.auth import get_user_model
from rest_auth.models import TokenModel
from rest_auth.utils import import_callable
from rest_auth.serializers import UserDetailsSerializer as DefaultUserDetailsSerializer
from rest_framework.response import Response
from fcm_django.models import FCMDevice

from home.models import (
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
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_auth.serializers import PasswordResetSerializer
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from django.utils.timezone import now


User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "user_role",
            "email",
            "password",
            "first_name",
            "last_name",
            "age",
            "phone_number",
        )
        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}},
            "email": {
                "required": True,
                "allow_blank": False,
            },
            "user_role": {"required": True},
        }

    def _get_request(self):
        request = self.context.get("request")
        if (
            request
            and not isinstance(request, HttpRequest)
            and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address.")
                )
        return email

    def create(self, validated_data):
        user = User(
            email=validated_data.get("email"),
            name=validated_data.get("name"),
            username=generate_unique_username(
                [validated_data.get("name"), validated_data.get(
                    "email"), "user"]
            ),
            first_name=validated_data.get("first_name"),
            last_name=validated_data.get("last_name"),
            age=validated_data.get("age"),
            user_role=validated_data.get("user_role"),
            phone_number=validated_data.get("phone_number"),
        )
        user.set_password(validated_data.get("password"))
        user.save()
        if (user.user_role == 2):
            Restaurant.objects.create(
                location_id=None, name='', img_url='', user_id=user.id)
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "user_role",
            "email",
            "name",
            "first_name",
            "last_name",
            "age",
            "phone_number",
        ]

    def update(self, instance, validated_data):
        instance.id = self.context['request'].user.id
        instance.user_role = validated_data.get('user_role', instance.user_role)
        instance.email = validated_data.get('email', instance.email)
        instance.name = validated_data.get('name', instance.name)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.age = validated_data.get('age', instance.age)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.save()
        return instance



# This is to allow you to override the UserDetailsSerializer at any time.
# If you're sure you won't, you can skip this and use DefaultUserDetailsSerializer directly
rest_auth_serializers = getattr(settings, 'REST_AUTH_SERIALIZERS', {})
UserDetailsSerializer = import_callable(
    rest_auth_serializers.get(
        'USER_DETAILS_SERIALIZER', DefaultUserDetailsSerializer)
)


class CustomTokenSerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer(read_only=True)

    class Meta:
        model = TokenModel
        fields = ('key', 'user')


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""

    password_reset_form_class = ResetPasswordForm


class LocationSerializer(GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """
    class Meta:
        model = Location
        geo_field = "geolocation"

        # you can also explicitly declare which fields you want to include
        # as with a ModelSerializer.
        fields = ('id', 'address', 'geolocation')


class RestaurantSerializer(serializers.ModelSerializer):
    location = LocationSerializer(many=False, read_only=False)

    class Meta:
        model = Restaurant
        fields = (
            "id",
            "location",
            "name",
            "img_url"
        )

    def create(self, validated_data):
        location = validated_data.get("location")
        restaurant = Restaurant(
            location=Location.objects.create(address=location.get("address"), geolocation=location.get("geolocation")),
            name=validated_data.get("name"),
            img_url=validated_data.get("img_url"),
            user_id=self.context['request'].user.id,
        )
        restaurant.save()
        return restaurant

    def update(self, instance, validated_data):
        location = validated_data.get('location', instance.location)
        location = Location(address=location.get("address"), geolocation=location.get("geolocation"))
        location.save()
        instance.location = location
        instance.name = validated_data.get('name', instance.name)
        instance.img_url = validated_data.get('img_url', instance.img_url)
        instance.user_id = self.context['request'].user.id
        instance.save()
        return instance


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class DealSerializer(serializers.ModelSerializer):
    # category = CategorySerializer(many=False, read_only=True)
    class Meta:
        model = Deal
        fields = (
            "category",
            "name",
            "price",
            "reduced_price",
            "special_offer",
            "img_url"
        )

    def create(self, validated_data):
        user_role = self.context['request'].user.user_role
        if user_role != 2:
            raise serializers.ValidationError(
                _("Only Vendor can make a deal.")
            )
        deal = Deal(
            name=validated_data.get("name"),
            price=validated_data.get("price"),
            reduced_price=validated_data.get("reduced_price"),
            category_id=self.data['category'],
            special_offer=validated_data.get("special_offer"),
            img_url=validated_data.get("img_url"),
            user_id=self.context['request'].user.id,
            restaurant_id=Restaurant.objects.get(
                user_id=self.context['request'].user.id).id
        )        
        deal.save()
        return deal


class DealGetSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=False, read_only=True)
    restaurant = RestaurantSerializer(many=False, read_only=True)

    class Meta:
        model = Deal
        fields = "__all__"


class TimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = "__all__"
    
    def validate_restaurant(self, restaurant):
        restaurant_id = self.context['request'].user.restaurant.id
        return restaurant_id

    def create(self, validated_data):
        user_role = self.context['request'].user.user_role
        
        if user_role != 2:
            raise serializers.ValidationError(
                _("Only Vendor can make a timeline.")
            )
        restaurant_id = self.context['request'].user.restaurant.id
        timeline = Timeline(
            weekday=validated_data.get("weekday"),
            time_from=validated_data.get("time_from"),
            time_to=validated_data.get("time_to"),
            restaurant_id=restaurant_id
        )
        timeline.save()
        return timeline

class User_BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Badge
        fields = "__all__"

    


class FCMNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FCMNotification
        fields = "__all__"


class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = "__all__"


class CheckInSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = CheckIn

        fields = ["deal", "price", "created_at"]

    def create(self, validated_data):
        restaurant_id = Deal.objects.get(id=self.data["deal"]).restaurant.id
        checkIn = CheckIn(
            restaurant_id=restaurant_id,
            deal_id=self.data["deal"],
            price=validated_data.get("price"),
            user_id=self.context['request'].user.id,
        )
        checkIn.save()
        return checkIn

        
    def update(self, instance, validated_data):
        restaurant_id = Deal.objects.get(id=self.data["deal"]).restaurant.id
        instance.restaurant_id = restaurant_id
        instance.deal_id = validated_data.get('deal', instance.deal_id)
        instance.price = validated_data.get('price', instance.price)
        instance.user_id = self.context['request'].user.id
        instance.save()
        return instance


class CheckInGetSerializer(serializers.ModelSerializer):
    deal = DealGetSerializer(many=False, read_only=False)
    restaurant = RestaurantSerializer(many=False, read_only=False)
    class Meta:
        model = CheckIn
        fields = "__all__"

class DescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Description
        fields = "__all__"


class NearbyPlacesAPISerializer(serializers.ModelSerializer):
    latitude = serializers.DecimalField(
        source='lat',max_digits=22, decimal_places=16, required=True,help_text="Latitude of your geographic coordinate")
    longitude = serializers.DecimalField(
        source='lng',max_digits=22, decimal_places=16, required=True,help_text="Longitude of your geographic coordinate")
    max_distance = serializers.IntegerField(
        required=True,
        help_text="Distance in kilometers. A suggested value could be from 1-5 kilometers, to display nearby places"
    )
    class Meta:
        model = Restaurant
        fields = ('latitude','longitude','max_distance')

class CustomFCMDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FCMDevice
        fields = "__all__"

class DistanceSerializer(serializers.Serializer):
    class Meta:
        lat_a = serializers.FloatField()
        long_a = serializers.FloatField()
        lat_b = serializers.FloatField()
        long_b = serializers.FloatField()
