from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

class PublicReadMixin(object):
    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return super().get_permissions()