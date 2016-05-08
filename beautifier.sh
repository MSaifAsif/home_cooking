
#js-beautify -rqj *.js
files=(`find . -type d -name node_modules -prune -o -name '*.js'`)
for file in "${files[@]}"; do
	#echo $file
	js-beautify -rqj $file
done
