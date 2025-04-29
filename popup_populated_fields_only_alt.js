Expects($feature, '*')
var fields = Schema($feature).fields

// For address, which all features should have

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
			Push(table_arr, '<tr><td style="border: 1px solid #ccc; padding: 5px; width: 35%;">' + alias)
            Push(table_arr, '</td><td style="border: 1px solid #ccc; padding: 5px;">' + f.value)
            Push(table_arr, '</td></tr>')
        }
    }
}

Console(table_arr)

if (Count(table_arr) > 0) {
    Insert(table_arr, 0, '<span style="display:inline-block; font-weight: 500; padding-bottom: 5px;">Additional information for this market:</span>')
    Insert(table_arr, 1, '<table style="font-size: 8pt; line-height: 11pt; border-collapse: collapse;">')
    Push(table_arr, '</table>')
    table_text = Concatenate(table_arr)
}

else {
    table_text = '<span style="font-weight: 500;">No additional information for this market.</span>'
}

return {
    type: 'text',
    text: table_text
}
