
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

var fields = Schema($feature).fields

for (var f of $feature) {
    if (Includes(popup_fields, f.key)) {
        if (!IsEmpty(f.value)) {

            // Thanks to this post for help with this part:
            // https://community.esri.com/t5/arcgis-online-questions/don-t-show-null-values-in-popup/m-p/1359714/highlight/true#M56367
            var alias = f.key
            for (var n in fields) {
                if (fields[n].name == f.key) alias = fields[n].alias
            }

            Push(popup_arr, alias + ': <b>' + f.value + '</b>')
        }
    }
}

var popup_text = Concatenate(popup_arr, '<br>')

return {
    type: 'text',
    text: `<p>${popup_text}</p>`
}
