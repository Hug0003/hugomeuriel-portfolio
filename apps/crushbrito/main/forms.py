from django import forms

class MessageForm(forms.Form):
    content = forms.CharField(
        label='Contenu du message',
        widget=forms.Textarea(attrs={'placeholder': 'Saisissez votre message ici...'})
    )

