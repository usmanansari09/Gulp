from ast import arg
from users.models import User
from django.conf import settings
from django_google_maps import fields as map_fields
from django.db import models
from django.contrib.gis.db import models
from django.utils.timezone import now
from fcm_django.models import FCMDevice
from firebase_admin.messaging import Message, Notification
from fcm_django.models import FCMDevice

def nameFile(instance, filename):
    return '/'.join(['images', str(instance.name), filename])


class Location(models.Model):
    address = map_fields.AddressField(max_length=200)
    geolocation = map_fields.GeoLocationField(max_length=100, default=None, blank=True, null=True)


class Rental(models.Model):
    """
    A model which holds information about a particular location
    """
    address = models.CharField(max_length=255, default=None, blank=True, null=True )
    city = models.CharField(max_length=100, default=None, blank=True, null=True )
    state = models.CharField(max_length=100, default=None, blank=True, null=True )
    point = models.PointField(default=None, blank=True, null=True )


class Restaurant(models.Model):
    "Generated Model"
    location = models.OneToOneField(
        Location, on_delete=models.CASCADE, default=None, blank=True, null=True)
    name = models.CharField(
        max_length=256,
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    img_url = models.ImageField(upload_to=nameFile, blank=True, null=True)
    created_at = models.DateTimeField(default=now, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.name

class Timeline(models.Model):
    "Generated Model"
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, default=None, blank=True, null=True)
    weekday = models.TextField(
        null=True,
        blank=True,
    )
    time_from = models.TimeField(
        null=True,
        blank=True,
    )
    time_to = models.TimeField(
        null=True,
        blank=True,
    )

 
class Category(models.Model):
    "Generated Model"
    name = models.CharField(
        max_length=1256,
    )
    icon = models.ImageField(upload_to=nameFile, blank=True, null=True)
    class Meta:
        verbose_name_plural = 'Categories'
    
    def __str__(self):
        return self.name


class Deal(models.Model):
    "Generated Model"
    name = models.TextField()
    price = models.IntegerField()
    reduced_price = models.IntegerField()
    restaurant = models.ForeignKey(
        Restaurant, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    special_offer = models.TextField(blank=True, null=True)
    img_url = models.ImageField(upload_to=nameFile, blank=True, null=True)
    featured = models.BooleanField(default=False, blank=True, null=True)
    created_at = models.DateTimeField(default=now, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def delete(self, *args, **kwargs):
        # send message to vendor start
        message = Message(data={'title':'title', 'body':'body'})
        vendor_device = FCMDevice.objects.filter(user_id=self.user.id)
        if(len(vendor_device) != 0):
            vendor_device[0].send_message(message)
        # send message to vendor end

        super(Deal, self).delete(*args, **kwargs)
    


class Badge(models.Model):
    "Generated Model"
    name = models.CharField(
        max_length=1256,
    )
    img_url = models.ImageField(upload_to=nameFile, blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class User_Badge(models.Model):
    "Generated Model"
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    acquired_on = models.DateTimeField(
        auto_now=True,
    )
    shown = models.BooleanField()


class FCMNotification(models.Model):
    "Generated Model"
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=now, blank=True)
    action_type = models.CharField(
        max_length=256,
    )
    action_id = models.IntegerField()
    # img_url = models.ImageField(upload_to=nameFile, blank=True, null=True)
    title = models.TextField()
    description = models.TextField()
    read_status = models.BooleanField(
        null=True,
        blank=True,
    )


class CheckIn(models.Model):
    "Generated Model"
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(
        Restaurant, on_delete=models.CASCADE)
    deal = models.ForeignKey(Deal, on_delete=models.CASCADE)
    price = models.IntegerField()
    created_at = models.DateTimeField(default=now, blank=True)


class Description(models.Model):
    "Generated Model"
    UserType = [
        ('CUSTOMER', 'CUSTOMER'),
        ('VENDOR', 'VENDOR')
    ]
    PageType = [
        ('ABOUT', 'About'),
        ('TERMS_AND_CONDITIONS', 'Terms and Conditions'),
        ('PRIVACY_POLICY', 'Privacy Policy')
    ]
    user_type = models.CharField(
        max_length = 50,
        choices=UserType,
        default='VENDOR',
    )

    page_type = models.CharField(
        max_length = 50,
        choices=PageType,
        default='ABOUT',
    )
    header = models.TextField(null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(default=now, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

