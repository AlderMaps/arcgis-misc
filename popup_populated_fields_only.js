
var popup_fields = [
    'USER_listing_name',
    'StAddr',
    'City',
    'RegionAbbr',
    'Postal',
    'USER_orgnization',
    'USER_listing_desc',
    'USER_location_site',
    'USER_location_desc',
    'USER_location_indoor',
    'USER_specialproductionmethods',
    'USER_saleschannel_onlineorder',
    'USER_saleschannel_phoneorder',
    'USER_saleschannel_csaorder',
    'USER_saleschannel_csa_vendor',
    'USER_saleschannel_deliverymetho',
    'USER_acceptedpayment',
    'USER_FNAP'
]

Expects($feature, '*')

var popup_arr = []

for (var f of $feature) {
    if (Includes(popup_fields, f.key)) {
        if (!IsEmpty(f.value)) {
            Push(popup_arr, f.key + ': ' + f.value)
        }
    }
}

var popup_text = Concatenate(popup_arr, '<br>')

return {
    type: 'text',
    text: `<p>${popup_text}</p>`
}
