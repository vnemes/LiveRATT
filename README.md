# LiveRATT

## Project Requirements
This Web Application aims at displaying a **live map** of all the Buses, Trolley Buses and Trams operated by the *Public Transport System of Timisoara*.
Some of the features included will be:
+ An *interactve map* of the city of Timisoara and the surrounding region
+ An overview of all the vehicles and their location on the dynamic map
+ The possibility of selecting a particular track in order to check its planned route, schedule and actual location

### Current Progress

So far, we were able to scrap the webpage that would provide is with the timings for each route (ScrappedExample.html) from [this link](http://86.122.170.105:61978/html/timpi/trasee.php?param1=1556). Format example:
```html
<table>
  <tr>
    <td align=center><b>Name of the Line and Direction</b></td>
  </tr>
</table><br><br>
<table bgcolor=D8D8D8 border='0'>
  <tr>
    <td align=center width="200"><b>Stația</b></td>
    <td align=center width="60"><b>Sosire</b></td>
  </tr>
</table>
<table bgcolor=D8D8D8 border='0'>
  <tr>
    <td align=left width="200"><b>Bd. Dâmbovița</b></td>
    <td align=center width="60"><b>12:10</b></td>
  </tr>
</table>
<table bgcolor=D8D8D8 border='0'>
  <tr>
    <td align=left width="200"><b>Station name</b></td>
    <td align=center width="60"><b>Time in format HH:MM or x min</b></td>
  </tr>
```
The webpage seems to select the route to be displayed based on the PHP variable *param1* in the URL. We have yet to find any correlation between the Line Name and the *random* number passed through that variable(random value, hash, random index in DB - or ordered lexicographically by station name?). 

We might write a small script to iterate through all possible 4 digit numbers and retrieve the pairing of the Line Name and the number in order to start building the data structures necessary to our application.

When a **invalid** number is passed through *param1*, the following webpage is returned:
```html
<table bgcolor=0048A1 style='color:white;' border='0'><tr>
<td align=center><b>Linia NU CIRCULĂ AZI! spre </b></td></tr>
</table><br><br><table bgcolor=D8D8D8 border='0'><tr>
    <td align=center width="200"><b>Stația</b></td>
    <td align=center width="60"><b>Sosire</b></td>
</tr>
</table><br><br><table bgcolor=0048A1 style='color:white;' border='0'><tr>
<td align=center><b>Linia NU CIRCULĂ AZI! spre </b></td></tr>
</table><br><br><table bgcolor=D8D8D8 border='0'><tr>
    <td align=center width="200"><b>Stația</b></td>
    <td align=center width="60"><b>Sosire
</b></td>  
```
