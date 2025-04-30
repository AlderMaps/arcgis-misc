// Short Arcade expression to generate a table of attribute values
// to display in a popup (or where popup HTML is used, e.g. Feature Info widget in ExB)
// The trick is to display a row ONLY for attribute values that are POPULATED.
// I.e. in my data, maybe 10% of these "extras" fields actually have values.
// I want to convey that information where it exists...
// ...but I don't want tons of white space or empty rows in my popup if it doesn't.
// Arcade to the rescue!

// Expects function ensures all the fields required for the popup are retrieved.
// Theoretically I should be able to pop my table_fields array in as an arg instead of *.
// Moreover, Esri says not to use wildcard unless absolutely necessary.
// But if I don't use *, popup no workie. *shrug*
Expects($feature, '*')

// Get fields from schema so I can use field aliases instead of field names in my table
var fields = Schema($feature).fields

// Fields I want in my table
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

// Initialize empty array and text vars to stuff things in
var table_arr = []
var table_text = ''

// Loop through fields of feature. Note: using "of" instead of "in"
// to loop through actual field names, not indices
for (var f of $feature) {

    // Check if the field is in my array above
    if (Includes(table_fields, f.key)) {

        // Check if the field is empty (most are)
        if (!IsEmpty(f.value)) {

            // Use fields from the schema to get the field alias for given field name
            var alias = f.key
            for (var n in fields) {
                if (fields[n].name == f.key) alias = fields[n].alias
            }

            // Smush some HTML into my array followed by the alias
	    Push(table_arr, '<tr><td style="border: 1px solid #ccc; padding: 5px; width: 35%;">' + alias)

            // Smush HTML, then the actual valie in the field
            Push(table_arr, '</td><td style="border: 1px solid #ccc; padding: 5px;">' + f.value)

            // Round the row out with the closing HTML tags
            Push(table_arr, '</td></tr>')
        }
    }
}

// So now we have either rows, or nothing. I don't even want to bother making the table
// if there isn't anything in my table array (i.e., no "extras" field had values)
// Check if the array is empty
if (Count(table_arr) > 0) {

    // If it isn't empty, go ahead and make the table. First a header-like statement:
    Insert(table_arr, 0, '<span style="display:inline-block; font-weight: 500; padding-bottom: 5px;">Additional information for this market:</span>')

    // then the actual HTML element
    Insert(table_arr, 1, '<table style="font-size: 8pt; line-height: 11pt; border-collapse: collapse;">')
    Push(table_arr, '</table>')

    // Finally concat that all into a single long text string
    table_text = Concatenate(table_arr)
}

// if my table array is empty, just output a message saying so.
else {
    table_text = '<span style="font-weight: 500;">No additional information for this market.</span>'
}

// Ship it
return {
    type: 'text',
    text: table_text
}
