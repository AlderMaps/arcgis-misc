var title_list = Split($feature.USER_listing_name, ' ')
var count = Count(title_list)

if (count == 0) {
  return ''
} 
else if ( 2 >= count >= 1) {
  return $feature.USER_listing_name
} 
else if (count >= 3) {
  var label_array = []
  if (count % 2 == 0) {
    for (var i=0; i < count; i+=2) {
      Push(label_array, title_list[i])
      Push(label_array, ' ')
      Push(label_array, title_list[i+1])
      Push(label_array, TextFormatting.NewLine)
    }
  } 
  else {
    for (var i=0; i < (count-1); i+=2) {
      Push(label_array, title_list[i])
      Push(label_array, ' ')
      Push(label_array, title_list[i+1])
      Push(label_array, TextFormatting.NewLine)
    } 
    Push(label_array, title_list[-1])
  }
  return Concatenate(label_array)
}
