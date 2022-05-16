from django.contrib.auth import get_user_model, forms
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

User = get_user_model()


class UserChangeForm(forms.UserChangeForm):
    class Meta(forms.UserChangeForm.Meta):
        model = User


class UserCreationForm(forms.UserCreationForm):

    error_message = forms.UserCreationForm.error_messages.update(
        {"duplicate_username": _("This username has already been taken.")}
    )

    class Meta(forms.UserCreationForm.Meta):
        model = User

    def clean_username(self):
        username = self.cleaned_data["username"]

        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username

        raise ValidationError(self.error_messages["duplicate_username"])


class VendorCreationForm(forms.UserCreationForm):

    error_message = forms.UserCreationForm.error_messages.update(
        {"duplicate_email": _("This email has already been taken.")}
    )

    error_message = forms.UserCreationForm.error_messages.update(
        {"can_not_empty": _("This Email can not be empty.")}
    )

    class Meta(forms.UserCreationForm.Meta):
        model = User

    def clean_username(self):
        username = self.cleaned_data["username"]

        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username

        raise ValidationError(self.error_messages["duplicate_username"])

    def clean_email(self):
        email = self.cleaned_data["email"]
        if email:
            try:
                User.objects.get(email=email)
            except User.DoesNotExist:
                return email
        else:
            raise ValidationError(self.error_messages["can_not_empty"])

        raise ValidationError(self.error_messages["duplicate_email"])

    # def clean_phone_number(self):
    #     phone_number = self.cleaned_data["phone_number"]
    #     if phone_number:
    #         try:
    #             User.objects.get(email=email)
    #         except User.DoesNotExist:
    #             return email
    #     else:
    #         raise ValidationError(self.error_messages["can_not_empty"])

    #     raise ValidationError(self.error_messages["duplicate_email"])
