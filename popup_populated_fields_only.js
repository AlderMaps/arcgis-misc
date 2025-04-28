Expects($feature, '*')
var fields = Schema($feature).fields

// For address, which all features should have

var addr_arr = []

Push(addr_arr, '<strong>' + $feature['StAddr'])
Push(addr_arr, $feature['City'] + ', ' + $feature['RegionAbbr'] + ' ' + $feature['Postal'] + '</strong>')

var addr_text = Concatenate(addr_arr, '<br>')
var popup_text = addr_text

// For table of sometimes-populated attributes

var table_fields = [
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

var table_text = ''
var table_arr = []

for (var f of $feature) {
    if (Includes(table_fields, f.key)) {
        if (!IsEmpty(f.value)) {
            var alias = f.key
            for (var n in fields) {
                if (fields[n].name == f.key) alias = fields[n].alias
            }
			Push(table_arr, '<tr><td style="border: 1px solid #ccc; padding: 5px;">' + alias)
            Push(table_arr, '</td><td style="border: 1px solid #ccc; padding: 5px;">' + f.value)
            Push(table_arr, '</td></tr>')
        }
    }
}

Console(table_arr)

if (Count(table_arr) > 0) {
    Insert(table_arr, 0, '<table style="font-size: 8pt; line-height: 11pt; border-collapse: collapse;">')
    Push(table_arr, '</table>')
    table_text = Concatenate(table_arr)
    popup_text = Concatenate(addr_text, '<br><br>', table_text)
}

return {
    type: 'text',
    text: popup_text
}
