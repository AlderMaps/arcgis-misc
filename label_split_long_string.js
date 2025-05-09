// Little Arcade bit that will take a (usually loooong) string
// from a single field and break it up into two-word chunks
// and put line breaks between them so my labels aren't so loooooong.
// AGOL seems to do this to an extent after about 4-5 words
// but I wanted a shorter more square-ish label.

// Note: A page I found today (not yesterday, unfortunately) outlines a really slick
// way to do this by character count, not word count.
// Would be handy for REALLY long labels where you want more uniformity:
// https://community.esri.com/t5/arcgis-pro-questions/forcing-label-new-line-width/m-p/1166700/highlight/true#M54302

// Take the string and split (on spaces) into an array
var title_list = Split($feature.USER_listing_name, ' ')

// Get number of words in the array
var count = Count(title_list)

// If array is empty, boooooo, add apologetic label
if (count == 0) {
  return '(No Market title available)'
} 

// Else if the array has only 1 or 2 words in it, leave it be
else if (count <= 2) {
  return $feature.USER_listing_name
} 

// Else if it's three or more, get to work
else {

  // make empty array to hold stuff that will be new label
  var label_array = []

  // If the array length is even...
  if (count % 2 == 0) {

    // Loop through the array two words at a time
    // make string for one line at a time and stuff in label array
    for (var i=0; i < count; i+=2) {
      Push(label_array, Concatenate([title_list[i], title_list[i+1]], ' '))
    }
  } 

  // If the array length is odd...
  else {

    // Loop through all but the last odd word,
    //make string for one line at a time and stuff in label array
    for (var i=0; i < (count-1); i+=2) {
      Push(label_array, Concatenate([title_list[i], title_list[i+1]], ' '))
    } 

    // Then tack the last lonely word onto the end of the array
    Push(label_array, title_list[-1])
  }

  // Finally convert the array into a long string
  // but now with newlines as separators
  return Concatenate(label_array, TextFormatting.NewLine)
}
