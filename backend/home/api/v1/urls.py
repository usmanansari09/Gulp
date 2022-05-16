from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
    BadgeViewSet,
    CategoryViewSet,
    CheckInViewSet,
    DealFavoritesViewSet,
    DealFeaturedViewSet,
    DealGetViewSet,
    DealViewSet,
    DescriptionViewSet,
    LocationViewSet,
    FCMNotificationViewSet,
    ProfileViewSet,
    RestaurantDistanceViewSet,
    RestaurantNearByViewSet,
    RestaurantViewSet,
    TimelineCustomerViewSet,
    TimelineViewSet,
    User_BadgeViewSet,
    CustomFCMDeviceViewSet
)

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
    LogoutViewSet,
)

# from fcm_django.api.rest_framework import FCMDeviceViewSet

router = DefaultRouter()
router.register('devices', CustomFCMDeviceViewSet, basename="devices")
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("logout", LogoutViewSet, basename="logout")
router.register("profile", ProfileViewSet)
router.register("restaurant", RestaurantViewSet)
router.register("location", LocationViewSet)
router.register("deal", DealViewSet)
router.register("deal-get", DealGetViewSet)
router.register("category", CategoryViewSet)
router.register("timeline", TimelineViewSet)
router.register(r"timeline_restaurant/(?P<id>\d+)", TimelineCustomerViewSet)
router.register("user_badge", User_BadgeViewSet)
router.register("notification", FCMNotificationViewSet)
router.register("badge", BadgeViewSet)
router.register("checkin", CheckInViewSet)
router.register("description", DescriptionViewSet)
router.register("near_by", RestaurantNearByViewSet)
router.register("favorites", DealFavoritesViewSet, basename='favorites')
router.register("featured", DealFeaturedViewSet)
router.register("restaurant_distance", RestaurantDistanceViewSet, basename="distance")

urlpatterns = [
    path("", include(router.urls)),
]