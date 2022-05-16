from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.utils.timezone import now


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """
    name = models.CharField(
        null=True,
        blank=True,
        max_length=255,
    )
    first_name = models.TextField(
        null=True,
        blank=True,
    )
    last_name = models.TextField(
        null=True,
        blank=True,
    )
    phone_number = models.CharField(
        null=True,
        blank=True,
        max_length=256,
    )
    age = models.IntegerField(
        null=True,
        blank=True,
    )
    user_role = models.IntegerField(
        null=True,
        default=1,
        blank=True,
    )
    created_at = models.DateTimeField(
        default=now,
        blank=True
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        blank=True,
        null=True
    )

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})


class Vendor(User):
    class Meta:
        proxy = True
