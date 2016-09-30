## Angular + Require + Gulp web app seed project

### brief folder system introduction
/--src
	|--components	(custom libs or plugins)
	|--directives	(public directives)
	|--i18n			(internationalization)
	|--images		
		|--common	(public images)
		|--cn		(cn's images)
		|--en		(en's images)
	|--services		(public services)
	|--styles		
		|--base.css		(reset styles)
		|--common.css	(all project's public styles)
		|--page			(all modules' styles)
			|--pageModule1.css	(cn's styles and en's styles all in this css)
	|--views
		|--pageModule1
			|--subPageModule1
				|--subPageModule1.html
				|--subPageModule1.js
			|--pageModule1.html
			|--pageModule1.js
	|--app.js	(angular project enterance)
	|--index.html 	(html enterance)
	|--main.js	(require configuration file)
|--.bowerrc
|--.gitignore
|--bower.json
|--gulpfile
|--package.json

### suppose you already has bower and npm
``` sheel
# install all node moudles for gulp
npm install
# install all web framworks and plugins
npm postinit
```

### configure your NGINX or something else

### http://localhost:xxxx/

### There is no test for this project, it's just a seed test; but there will have the test module in the future; welcome to raise some ideas or make some suggestions~~ Thank you very much! :)

