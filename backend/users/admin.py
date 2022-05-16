import os
import json
from django.contrib import admin
from django.db.models.aggregates import Count
from django.db.models.fields import DateField
from django.template.response import TemplateResponse
from django.urls.conf import path
from twilio.base.exceptions import TwilioRestException
from twilio.rest import Client 
from django.conf import settings
from home.models import CheckIn, Restaurant
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from django.db.models.functions import TruncDate
from users.forms import UserChangeForm, UserCreationForm, VendorCreationForm
from django.core.mail import send_mail
from .models import User, Vendor


User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    change_list_template = "admin/model_change_list.html"
    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (("User", {"fields": ("name", "age", "phone_number",
                 "user_role")}),) + auth_admin.UserAdmin.fieldsets
    list_display = ["username", "first_name", "last_name", "age",
                    "phone_number", "user_role_show", "is_superuser"]
    search_fields = ["username", "first_name",
                     "last_name", "age", "phone_number", ]

    def user_role_show(self, obj):
        return "Customer" if obj.user_role == 1 else "Vendor"

    def get_search_results(self, request, queryset, search_term):
        queryset, use_distinct = super(UserAdmin, self).get_search_results(
            request, queryset, search_term)
        try:
            search_term_as_int = 1 if search_term == "Custom" else 2 if search_term == "Vendor" else 0
            queryset |= self.model.objects.filter(user_type=search_term_as_int)
        except:
            pass
        return queryset, use_distinct

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('analytics/', self.admin_site.admin_view(self.analytics,
                 cacheable=True), name="analytics"),
        ]
        return my_urls + urls

    def analytics(self, request):
        analytics_signup_per_day = list(User.objects
                                        .annotate(
                                            date=TruncDate('created_at')
                                        )
                                        .values('date', 'user_role')
                                        .annotate(dcount=Count('date'))
                                        .order_by("-dcount")
                                        )
        for item in analytics_signup_per_day:
            item['date'] = item['date'].strftime("%m/%d/%Y")

        checkIn_by_vendor = list(CheckIn.objects
                                 .values('restaurant__id', 'restaurant__name')
                                 .annotate(dcount=Count('restaurant__id'))
                                 .order_by("-dcount")
                                 )

        context = dict(
            # Include common variables for rendering the admin template.
            self.admin_site.each_context(request),
            analytics_signup_per_day=json.dumps(analytics_signup_per_day),
            checkIn_by_vendor=json.dumps(checkIn_by_vendor),
            key="value"
            # Anything else you want in the context...
        )
        return TemplateResponse(request, "admin/analytics.html", context)


@admin.register(Vendor)
class VendorAdmin(auth_admin.UserAdmin):
    form = UserChangeForm
    add_form = VendorCreationForm
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ("email", "name", "phone_number")}),
    )
    list_display = ["username", "name", "email", "phone_number", "user_role_show"]
    search_fields = ["username", "first_name",
                     "last_name", "age", "phone_number", ]

    def save_model(self, request, obj, form, change):
        obj.user_role = 2
        password = obj._password
        obj.save()
        Restaurant.objects.create(
            location_id=None, name='', img_url='', user_id=obj.id)
        if obj.phone_number and settings.TWILLIO_ACCOUNT_ID and settings.TWILLIO_AUTH_TOKEN and settings.TWILLIO_FROM_NUMBER:
            res_code = self.sendSMS(obj.phone_number, obj.email, password)
        self.sendEmail(obj.email, password)

    def get_fieldsets(self, request, obj=None):
        if not obj:
            return self.add_fieldsets
        return super().get_fieldsets(request, obj)

    def get_queryset(self, request):
        return self.model.objects.filter(user_role=2)

    def user_role_show(self, obj):
        return "Customer" if obj.user_role == 1 else "Vendor"

    def get_search_results(self, request, queryset, search_term):
        queryset, use_distinct = super(VendorAdmin, self).get_search_results(
            request, queryset, search_term)
        try:
            search_term_as_int = 1 if search_term == "Custom" else 2 if search_term == "Vendor" else 0
            queryset |= self.model.objects.filter(user_type=search_term_as_int)
        except:
            pass
        return queryset, use_distinct

    def sendSMS(self, phone_number, email, password):
        try:
            # Find these values at https://twilio.com/user/account
            # To set up environmental variables, see http://twil.io/secure
            account_sid = settings.TWILLIO_ACCOUNT_ID
            auth_token = settings.TWILLIO_AUTH_TOKEN

            client = Client(account_sid, auth_token)

            client.api.account.messages.create(
                to=phone_number,
                from_=settings.TWILLIO_FROM_NUMBER,
                body='Your account is created by Admin. You can login with this information. email: {}, password: {}'.format(email, password))
            return 200
        except TwilioRestException as e:
            print(e)
            print(e.code)
            print('==============')
            return e.code  # or whetever attribute e has for it...`
        

    def sendEmail(self, email, password):
        send_mail('TEST EMAIL', 'Your account is created by Admin. You can login with this information. email: {}, password: {}'.format(
            email, password), settings.DEFAULT_FROM_EMAIL, [email], fail_silently=False)
