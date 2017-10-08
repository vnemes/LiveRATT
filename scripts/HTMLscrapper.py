from lxml import html
import requests

start 	= 1
end 	= 3000

f = open('stations.csv', 'w')
for param1 in range(start, end):
	pageContainer = requests.get('http://86.122.170.105:61978/html/timpi/trasee.php?param1='+str(param1))
	pageTree = html.fromstring(pageContainer.content)
	stationName = pageTree.xpath('(//table)[1]/tr[1]/td[1]//text()')
	stationString = '\n'.join(map(str,stationName))
	print(str(param1)+'\t'+stationString)
	if not str(stationString).startswith('Linia NU'):
		f.write(str(param1)+" , "+(stationString.replace("Linia ","")).split(" ")[0] +"\n") 
		print('---------- Item Added ------------')
f.close
	