# LiveRATT

## Project Requirements
This Web Application aims at displaying a **live map** of all the Buses, Trolley Buses and Trams operated by the *Public Transport System of Timisoara*.
Some of the features included will be:
+ An *interactve map* of the city of Timisoara and the surrounding region
+ An overview of all the vehicles and their location on the dynamic map
+ The possibility of selecting a particular track in order to check its planned route, schedule and actual location

## Current Progress
### Week1

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

When an **invalid** number is passed through *param1*, the following webpage is returned:
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

### Week 2

Using a small [python script](https://github.com/vnemes/LiveRATT/blob/master/scripts/HTMLscrapper.py), we managed to find the correlation between the php parameter in the URL and the actual line number as follows:
<details>
  <summary>Click to expand table</summary>
  
| param1 | Transport Route | 
|--------|--------------| 
| 1106   | 1            | 
| 1126   | 2            | 
| 1207   | 3            | 
| 1266   | 4            | 
| 1553   | 5            | 
| 2246   | 5            | 
| 2386   | 7            | 
| 2846   | 7            | 
| 1558   | 8            | 
| 2406   | 9            | 
| 2726   | 10           | 
| 990    | 11           | 
| 1066   | 13           | 
| 2826   | 13           | 
| 1006   | 14           | 
| 989    | 15           | 
| 1206   | 16           | 
| 1086   | 17           | 
| 1166   | 18           | 
| 1146   | 21           | 
| 2566   | 22           | 
| 1226   | 28           | 
| 2626   | 29           | 
| 1546   | 32           | 
| 1046   | 33           | 
| 886    | 40           | 
| 1548   | 44           | 
| 1406   | 46           | 
| 2546   |  13b         | 
| 2326   |  1a          | 
| 2346   |  2a          | 
| 1646   |  32a         | 
| 2466   |  33b         | 
| 1886   |  3a          | 
| 1666   |  40a         | 
| 1686   |  44a         | 
| 2426   |  5a          | 
| 2446   |  5b          | 
| 2686   |  6a          | 
| 2706   |  6b          | 
| 1556   |  7a          | 
| 1557   |  7b          | 
| 2666   |  8b          | 
| 2306   |  Ab33        | 
| 1550   |  E1          | 
| 1551   |  E2          | 
| 1552   |  E3          | 
| 2586   |  E33         | 
| 1926   |  E4          | 
| 2486   |  E4b         | 
| 1526   |  E5          | 
| 1928   |  E6          | 
| 2026   |  E7          | 
| 1326   |  E7b         | 
| 1547   |  E8          | 
| 2746   |  LFA         | 
| 2526   |  LMA         | 
| 2786   |  M11         | 
| 2766   |  M14         | 
| 2906   |  M22         | 
| 2926   |  M22a        | 
| 2946   |  M22b        | 
| 2966   |  M22c        | 
| 2986   |  M22d        | 
| 1746   |  M30         | 
| 1986   |  M35         | 
| 2006   |  M36         | 
| 2646   |  M43         | 
| 2506   |  M44         | 
| 2606   |  M45         | 
| 2166   |  P1-a        | 
| 2146   |  P1-d        | 
| 2207   |  P2-a        | 
| 2186   |  P2-d        | 
| 2206   |  P2-s        | 
| 2086   |  P3          | 
| 2126   |  P4-a        | 
| 2106   |  P4-d        | 
| 2866   |  RDCN        | 
| 1186   |  Tb19        | 
| 2366   |  test        | 
| 1966   |  Tv3b        | 
| 2266   |  TV5         | 
| 2226   |  Tv6         | 
| 1286   |  Tv9         | 
</details> <br />

Added a node.js server that responds with an html page on any connection attempt.<br />
The page contains our current implementation of the Google Maps API.

<details>
  <summary>Current Map Progres</summary>
   <p align="center">
    <img src="https://i.imgur.com/0uyZc4Y.png" width="100%"/>  
   </p>
</details>
