from django.contrib.gis import admin
from django.template import Template
from django.http.response import HttpResponseRedirect
from django.urls.conf import path
from .models import (
    Badge,
    Category,
    Deal,
    Description,
    FCMNotification,
    Rental,
    Restaurant,
    Timeline,
    User_Badge,
    Location,    
)

from django_google_maps import widgets as map_widgets
from django_google_maps import fields as map_fields
class LocationAdmin(admin.ModelAdmin):
    formfield_overrides = {
        map_fields.AddressField: {
          'widget': map_widgets.GoogleMapsAddressWidget(attrs={'data-map-type': 'roadmap'})},
    }

admin.site.register(Restaurant)
# admin.site.register(Deal)
admin.site.register(Category)
admin.site.register(Timeline)
admin.site.register(User_Badge)
admin.site.register(FCMNotification)
admin.site.register(Badge)
admin.site.register(Description)
admin.site.register(Rental, admin.OSMGeoAdmin)
admin.site.register(Location, LocationAdmin)

# Register your models here.


@admin.register(Deal)
class DealAdmin(admin.ModelAdmin):
    actions = ('make_featured_deal',)
    # fieldsets = (("Deal", {"fields": []}),)
    list_display = ["name", "price", "featured"]
    search_fields = ["name", "price"]
    list_editable = ['featured']
    
    # def make_featured_deal(self, modeladmin, request, queryset):
    #     queryset.update(featured=True)
    # make_featured_deal.short_description = "Mark Deal as featured"

