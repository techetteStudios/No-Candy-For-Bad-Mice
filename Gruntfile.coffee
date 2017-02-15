# Build Script $Rev: 332 $

module.exports = (grunt) ->

	# Parse game config into gameConfigContext
	vm = require "vm"
	os = require "os"
	_ = require "underscore"
	try
		gameConfigTxt = grunt.file.read("js/GameConfig.js")
		gameConfigContext = {}
		vm.runInNewContext gameConfigTxt, gameConfigContext
		gameConfigContext.GameConfig.CSS ?= []
		gameConfigContext.GameConfig.EXCLUDE ?= []
		gameConfigContext.GameConfig.SOURCE ?= []
		if gameConfigContext.GameConfig.PATH
			gameConfigContext.GameConfig.PATH = gameConfigContext.GameConfig.PATH.replace(/\//g,'')
	catch e
		grunt.fail.fatal "Failed to load GameConfig:\n" + e

	# Load up users personal build config
	try
		homeDir = process.env.HOME || process.env.USERPROFILE
		personalConfig = grunt.file.readJSON(homeDir + '/.tresensa/buildConfig.json')
	catch e
		grunt.fail.fatal "Failed to load buildConfig.json:\n #{e} \n Make sure you have a a personal buildConfig.json in ~/.tresensa/"

	# Load up game's build config
	try
		buildConfig = grunt.file.readJSON('buildConfig.json')
		allowedBuildconfigProps = ["compress", "nativeId", "custom_fonts"]
		ignoredBuildconfigProps = _.difference(_.keys(buildConfig), allowedBuildconfigProps)
		if ignoredBuildconfigProps.length
			grunt.log.warn "Warning: the only buildConfig.json properties honored are #{allowedBuildconfigProps}. Ignoring #{ignoredBuildconfigProps}"
	catch e
		buildConfig = {}



	# Load config from console
	grunt.log.write("Fetching game properties from Tresensa Console...")
	response = require('sync-request')("POST", "http://console.tresensa.com/game/gruntBuildConfig?game_id=#{gameConfigContext.GameConfig.GAME_ID}", headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: "password=#{encodeURIComponent('GeWmNF=c4@zT5pFdXuSj')}")
	if response.statusCode == 200
		defaultConsoleProperties = {id: "", keywords: "", description: "", slug: "", title: "", short_description: "", width: 640, height: 832, has_iap: false, amazon_app_key: "", android_billing_key: "", twitter_username: "", facebook_app_id: "", ios_app_id: "", android_app_id: "", ios_appstore_url: "", android_appstore_url: ""}
		consoleProperties = _.extend({}, defaultConsoleProperties, JSON.parse(response.body))
		grunt.log.ok()

	if !consoleProperties
		grunt.fail.fatal "Could not fetch game properties from Tresensa Console"

	missingConsoleProps = _.filter _.keys(consoleProperties), (prop) -> consoleProperties[prop] == ""

	if missingConsoleProps.length
		grunt.log.warn "Warning: Some console properties are empty: #{missingConsoleProps}"

	# all of these tempaltes should probably live in their own file, but trying to keep file 
	# dependancies down since we cant add single file externals
	manifestTemplate = """
		CACHE MANIFEST
		# Updated: <%= dateStamp %>

		<%= cdnDomain %>tgl/tgl-<%= tglVersion %>.min.js
		<%= cdnDomain %>tgl/tgl.boot.min.js

		<%= cdnDomain %>tge/tge-<%= tgeVersion %>.min.js

		<%= cdnDomain %>tgs/tgs-<%= tgsVersion %>.min.js
		<%= cdnDomain %>tgs/css/tgs-<%= tgsVersion %>.css
		<%= cdnDomain %>tgs/tgs-adapters-<%= tgsVersion %>.min.js

		<%= cdnDomain %>tge/3rdparty/PxLoader.min.js
		<%= cdnDomain %>tge/3rdparty/PxLoaderImage.min.js
		<%= cdnDomain %>tgs/3rdparty/iscroll-lite.min.js
		<%= cdnDomain %>tge/3rdparty/font.min.js
		<%= cdnDomain %>tgs/3rdparty/addtohomescreen.min.js

		<%= cdnDomain %>tgs/A0020/A0020-1.0.7.min.js
		//cdn.kik.com/kik/1.0.18/kik.js
		//sdk.tresensa.com/tgs/images/kik-moregames.png

		//sdk.tresensa.com/tgs/images/amazoncoin.png
		//sdk.tresensa.com/tgs/images/facebookcredit.png
		//sdk.tresensa.com/tgs/images/gamesdotcom.png
		//sdk.tresensa.com/tgs/images/kik_login.png
		//sdk.tresensa.com/tgs/images/kik.png
		//sdk.tresensa.com/tgs/images/kik-moregames.png
		//sdk.tresensa.com/tgs/images/logout.png
		//sdk.tresensa.com/tgs/images/mocogold.png
		//sdk.tresensa.com/tgs/images/processing.gif
		//sdk.tresensa.com/tgs/images/test_login.png
		//sdk.tresensa.com/tgs/images/testicon.png
		//sdk.tresensa.com/tgs/images/more_games.png
		//sdk.tresensa.com/tgs/images/close-button.png
		//sdk.tresensa.com/tgs/images/more-games-back.png
		//sdk.tresensa.com/tgs/images/redirects/facebook.png

		<%= favicon %>
		<%= files %>

		NETWORK:
		*
	"""

	indexTemplate = """
		<!DOCTYPE html>
		<html<%= cacheManifest %>>
		<head>
			<base href='<%= baseHref %>' target='_blank'>

			<title><%= title %></title>

			<meta http-equiv="X-UA-Compatible" content="IE=IE9" >
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

			<meta name="apple-mobile-web-app-capable" content="yes">
			<meta name="mobile-web-app-capable" content="yes">
			<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

			<meta name="title" content="<%= title %>">
			<meta name="description" content="<%= description %>">
			<meta name="keywords" content="<%= keywords %>">
			<link rel="canonical" href="<%= canonical %>">

			<link rel="shortcut icon" href="../favicon.ico">
			<link rel="image_src" href="../banners/172x188.jpg">
			<link rel="apple-touch-icon" href="../icons/144x144.png" />
			<link rel="touch-icon" href="../icons/144x144.png" />

			<link rel="stylesheet" href="leaderboard/css/game_specific.css" type="text/css" media="screen">

			<!-- Facebook meta-tags -->
			<meta property="og:url" content="http://<%= slug %>.tresensa.com/?dst=A0003">
			<meta property="og:title" content="<%= title %>">
			<meta property="og:description" content="<%= short_description %>">
			<meta property="og:image" content="http://<%= slug %>.tresensa.com/banners/1024x680.jpg">
			<meta property="og:image:width" content="1024"/>
			<meta property="og:image:height" content="680"/>
			<meta property="og:site_name" content="<%= title %>">
			<meta property="og:type" content="website"/>
			<meta property="fb:app_id" content="<%= facebook_app_id %>"/>
			<meta property="og:type" content="game">

			<!-- Twitter Card properties -->
			<meta name="twitter:card" content="player"/>
			<%= twitterSite %>
			<meta name="twitter:player" content="https://<%= slug %>.tresensa.com/index.html?dst=A0004"/>
			<meta name="twitter:player:width" content="<%= width %>"/>
			<meta name="twitter:player:height" content="<%= height %>"/>
			<meta name="twitter:title" content="<%= title %>"/>
			<meta name="twitter:description" content="<%= short_description %>"/>
			<meta name="twitter:image" content="https://<%= slug %>.tresensa.com/banners/940x408.jpg"/>
			<meta property="twitter:app:id:iphone" content="id<%= ios_app_id %>">
			<meta property="twitter:app:id:ipad" content="id<%= ios_app_id %>">
			<meta property="twitter:app:id:googleplay" content="<%= android_app_id %>">
			<meta property="twitter:app:country" content="us">
			<meta property="twitter:app:url:iphone" content="<%= ios_appstore_url %>">
			<meta property="twitter:app:url:ipad" content="<%= ios_appstore_url %>">
			<meta property="twitter:app:url:googleplay" content="<%= android_appstore_url %>"> 

			<!-- Kik properties -->
			<meta name="kik-unsupported" content="android-2.3,ios-5">
			<link rel="kik-icon" href="/icons/256x256.png">
			<link rel="kik-icon-fallback" href="/banners/256x160.png">
			<link rel="terms" href="http://www.tresensa.com/terms-of-use/">
			<link rel="privacy" href="http://www.tresensa.com/privacy-policy/">
			<!-- <meta name="kik-https" content="<%= slug %>.tresensa.com"> -->

			<meta name="viewport" content="<%= viewport %>" />

			<%= kikScript %>
			<%= cordovaScript %>

			<script src="<%= bootScript %>"></script>

			<%= headExtra %>
		</head>
		<body id="<%= bodyId %>" class="<%= bodyClass %>">
			<%= bodyExtra %>
			<%= body %>
		</body>
		</html>
	"""

	redirectIndexTemplate = """
		<!DOCTYPE html>
		<html>
		<head>
			<script type="text/javascript">
				window.location = location.protocol + "//<%= slug %>.tresensa.com" + location.search + location.hash;
			</script>
		</head>
		<body>
		</body>
		</html>
	"""

	TGEStyle = """
	<style type="text/css">html,body{margin:0;padding:0;font-family:Arial;font-size:12px;color:#fff;background:#000 url(background.jpg);-webkit-text-size-adjust:none;-webkit-tap-highlight-color:transparent}#game_canvas{z-index:1;overflow:hidden;image-rendering:optimizeSpeed;-webkit-tap-highlight-color:transparent;-moz-tap-highlight-color:transparent;-webkit-user-select:none;-webkit-transform:translateZ(0);-ms-touch-action:none}#wrong_orientation{background:#000;position:absolute;top:0;left:0;z-index:2;width:100%;height:100%;display:none}#wrong_orientation img{display:block;margin:0 auto;width:80%}</style>
	"""

	defaultBody = """
	<div id="wrong_orientation" style="display:none;" ><img src = "reorient-message.jpg" /></div >
	<div id="preloader" align="center">Connecting to Game Server...</div>
	<div id="game_canvas"></div>
	"""

	firefoxManifestTemplate = """
	{
		"name": "<%= title %>",
		"description": "<%= description %>",
		"launch_path": "/index.html?dst=A0008&moregames=https%3A%2F%2Fmarketplace.firefox.com%2Fsearch%3Fq%3Dtresensa",
		"icons": {
			"16": "http://<%= slug %>.tresensa.com/icons/16x16.png",
			"32": "http://<%= slug %>.tresensa.com/icons/32x32.png",
			"48": "http://<%= slug %>.tresensa.com/icons/48x48.png",
			"60": "http://<%= slug %>.tresensa.com/icons/60x60_firefox_os.png",
			"64": "http://<%= slug %>.tresensa.com/icons/64x64.png",
			"90": "http://<%= slug %>.tresensa.com/icons/90x90.png",
			"128": "http://<%= slug %>.tresensa.com/icons/128x128.png",
			"256": "http://<%= slug %>.tresensa.com/icons/256x256.png",
			"512": "http://<%= slug %>.tresensa.com/icons/512x512.png"
		},
		"developer": {
			"name": "TreSensa",
			"url": "http://www.tresensa.com"
		},
		"default_locale": "en",
    "type": "web",
		"orientation": ["<%= orientation %>"],
		"fullscreen": "true",
		"appcache_path": "/cache.manifest",
		"chrome": { "navigation": true }
	}
	"""

	amazonManifestTemplate = """
	{
		"verification_key": "<%= amazon_app_key %>",
		"launch_path": "index.html?dst=A0011",
		"permissions": <%= permissions %>,
		"type": "web",
		"version": "<%= version %>",
		"last_update": "<%= dateStamp %>",
		"created_by": "TreSensa Inc."
	}
	"""

	cordovaConfigXML = """
	<?xml version="1.0" encoding="UTF-8"?>
	<widget xmlns="http://www.w3.org/ns/widgets"
		xmlns:gap="http://phonegap.com/ns/1.0"
		id="<%= id() %>"
		version="<%= version %>"
		viewmodes="fullscreen">
			<access origin="*"/>
			<author href="http://www.tresensa.com" email="support@tresensa.com">TreSensa</author>
			<content src="index.html"/>
			<name><%= name %></name>
			<preference name="Orientation" value="<%= orientation %>" />
			<preference name="com.smartmobilesoftware.inappbilling.public_key" value="<%= billing_key %>" />
			<gap:config-file platform="ios" parent="UISupportedInterfaceOrientations" overwrite="true">
				<array>
					<%= orientationModes %>
				</array>
			</gap:config-file>
			<gap:config-file platform="ios" parent="UIAppFonts" overwrite="true">
				<array>
					<%= customFonts() %>
				</array>
			</gap:config-file>
			<gap:config-file platform="ios" parent="UIStatusBarHidden" overwrite="true">
				<true/>
			</gap:config-file>
			<gap:config-file platform="ios" parent="UIViewControllerBasedStatusBarAppearance" overwrite="true">
				<false/>
			</gap:config-file>
	</widget>
	"""

	defaultBuildconfig = 
		compress: true

	# Configure tasks
	grunt.initConfig
		gameConfig: gameConfigContext.GameConfig
		personalConfig: personalConfig
		consoleProperties: consoleProperties
		buildConfig: _.defaults {}, buildConfig, defaultBuildconfig

		distDir: "dist/"

		clean: ["<%= distDir %>", 'dist_releases']

		copy:
			game:
				src: [
					"**"

					"!README.md"

					"!index.html"
					"!index-*.html"

					"!web-app-manifest.json"
					"!manifest.webapp"
					"!cache.manifest"

					"!favicon.ico"
					"!kik-icon.png"
					"!tizen-icon.png"
					"!web-image.jpg"
					"!apple-touch-icon.png"

					"!Gruntfile.coffee"
					"!package.json"
					"!buildConfig.json"
					"!config.xml"
					"!js/GameConfig.js"
					"!js/TizenConfig.js"

					"!node_modules/**"
					"!dist/**"
					"!dist_gzip/**"
					"!dist_phonegap/**"
					"!icons/**"
					"!banners/**"
					"!screenshots/**"
					"!cordova/**"
					"!*.zip"

					"!assets/source-images/**"
					"!assets/images-source/**"

					# exclude default tresensa lib
					"!js/lib/tgl/**"
					"!js/lib/tge/**"
					"!js/lib/tgs/**"
					"!js/lib/kik/**"
					"!js/lib/PxLoader.min.js"
					"!js/lib/PxLoaderImage.min.js"
					"!js/lib/bugsense.1.1.min.js"
					"!js/lib/cards.min.js"
					"!js/lib/font.min.js"
					"!js/lib/head.load.min.js"
					"!js/lib/head.min.js"
					"!js/lib/iscroll-lite.min.js"
					"!js/lib/iscroll.min.js"
					"!js/lib/playnomics.min.js"
					"!bower_components/tgl/**"
					"!bower_components/tge/**"
					"!bower_components/tgs/**"
				]
				dest: "<%= distDir %><%= gameConfig.VERSION %>/"
			# Only run for QA builds
			cssQA:
				src: "<%= gameConfig.CSS %>"
				dest: "<%= distDir %><%= gameConfig.VERSION %>/"
			jsQA:
				src: "<%= gameConfig.SOURCE %>"
				dest: "<%= distDir %><%= gameConfig.VERSION %>/"
			# Only run for PROD builds if CDN is disabled
			tgSDK:
				src: "js/lib/**"
				dest: "<%= distDir %><%= gameConfig.VERSION %>/"
			bowerComponents:
				expand: true
				cwd: "bower_components/"
				src: "**"
				dest: "<%= distDir %><%= gameConfig.VERSION %>/js/lib/"

		# Only used in QA builds, prod builds are concated by uglify
		concat:
			options:
				separator: ";"

			game:
				src: "<%= gameConfig.SOURCE %>"
				dest: "<%= distDir %><%= gameConfig.VERSION %>/js/game.js"

		# Only used in PROD builds, QA builds are concated by concat
		uglify:
			options:
				mangle: "<%= buildConfig.compress %>"
				compress: "<%= buildConfig.compress %>"
			game:
				src: "<%= gameConfig.SOURCE %>"
				dest: "<%= distDir %><%= gameConfig.VERSION %>/js/game.min.js"

		cssmin:
			game_css:
				files:
					'<%= distDir %><%= gameConfig.VERSION %>/css/game.css': "<%= gameConfig.CSS %>"

		compress:
			zip:
				options:
					archive: '<%= consoleProperties.title %> <%= gameConfig.VERSION %>.zip'
				files: [{
					expand: true
					cwd: 'dist/'
					src: '**'
				}]

		# Used for both PROD and QA
		s3Files: [{
			expand: true
			cwd: 'dist/'
			# copy all files in dist except for html and 
			# manifests which are copied in next step
			src: [
				'**'
				"!manifest.webapp"
				"!web-app-manifest.json"
				"!index.html"
				"!kik.html"
				"!home.html"
				"!cache.manifest"
			]
			dest: '<%= consoleProperties.slug %>/'
		}, {                        
			expand: true
			cwd: 'dist/'
			# Copy manifests and index file with CacheControl set
			src: [
				"manifest.webapp"
				"web-app-manifest.json"
				"index.html"
				"kik.html"
				"home.html"
				"cache.manifest"
			]
			dest: '<%= consoleProperties.slug %>/'
			params:
				CacheControl: 'max-age=0, private'
		}]


		aws_s3:
			options: 
				accessKeyId: '<%= personalConfig.aws.accessKeyId %>'
				secretAccessKey: '<%= personalConfig.aws.secretAccessKey %>'
				uploadConcurrency: 5
				downloadConcurrency: 5
				# debug: true
			qa:
				options:
					bucket: 'qa-games.tresensa.com'
				files: '<%= s3Files %>'
			prod:
				options:
					bucket: 'games.tresensa.com'
				files: '<%= s3Files %>'
			download_icons:
				options:
					bucket: '<%= consoleProperties.slug %>.tresensa.com'
				files: [
					{dest: 'icons/29x29.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/36x36.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/40x40.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/48x48.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/50x50.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/57x57.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/58x58.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/60x60.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/72x72.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/76x76.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/80x80.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/96x96.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/100x100.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/114x114.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/120x120.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/144x144.png', cwd: 'cordova/icons/', action: 'download'}
					{dest: 'icons/152x152.png', cwd: 'cordova/icons/', action: 'download'}

					{dest: 'splash/320x480.png', cwd: 'cordova/splash/', action: 'download'}
					{dest: 'splash/640x960.png', cwd: 'cordova/splash/', action: 'download'}
					{dest: 'splash/640x1136.png', cwd: 'cordova/splash/', action: 'download'}
					{dest: 'splash/768x1024.png', cwd: 'cordova/splash/', action: 'download'}
					{dest: 'splash/1024x768.png', cwd: 'cordova/splash/', action: 'download'}
					{dest: 'splash/1536x2048.png', cwd: 'cordova/splash/', action: 'download'}
					{dest: 'splash/2048x1536.png', cwd: 'cordova/splash/', action: 'download'}
				]

		rsync:
			options:
				args: ["--verbose",  "--chmod=Dg+s,ug+rw"]
				recursive: true
			qa:
				options:
					src: "./dist/",
					dest: "/var/www/qa-games.tresensa.com/<%= consoleProperties.slug %>/"
					host: "<%= personalConfig.qagames.username %>@qa-games.tresensa.com"

		buildAppcache:
			prod: 
				localFiles: [
					"<%= gameConfig.VERSION %>/**"
					"!<%= gameConfig.VERSION %>/index.html"
					"!<%= gameConfig.VERSION %>/js/lib/tgl/**"
					"!<%= gameConfig.VERSION %>/js/lib/tge/**"
					"!<%= gameConfig.VERSION %>/js/lib/tgs/**"
					"!<%= gameConfig.VERSION %>/js/lib/kik/**"
					"!<%= gameConfig.VERSION %>/js/lib/PxLoader.min.js"
					"!<%= gameConfig.VERSION %>/js/lib/PxLoaderImage.min.js"
					"!<%= gameConfig.VERSION %>/js/lib/bugsense.1.1.min.js"
					"!<%= gameConfig.VERSION %>/js/lib/cards.min.js"
					"!<%= gameConfig.VERSION %>/js/lib/font.min.js"
					"!<%= gameConfig.VERSION %>/js/lib/head.load.min.js"
					"!<%= gameConfig.VERSION %>/js/lib/head.min.js"
					"!<%= gameConfig.VERSION %>/js/lib/iscroll-lite.min.js"
					"!<%= gameConfig.VERSION %>/js/lib/iscroll.min.js"
					"!<%= gameConfig.VERSION %>/js/lib/playnomics.min.js"
					"!<%= gameConfig.VERSION %>/js/CordovaConfig-*.js"
					"!<%= gameConfig.VERSION %>/index.html"
					"!<%= gameConfig.VERSION %>/home.html"
					"!<%= gameConfig.VERSION %>/kik.html"
					"!<%= gameConfig.VERSION %>/**/*.mp3"
				]

		shell:
			update:
				options:
					stdout: true
					stderr: true
					stdin: true
				command: [
					'svn export https://svn.tresensa.com/TreSensaCoreClient/tresensasdk/trunk/gamebuild/Gruntfile.coffee --force'
					'svn export https://svn.tresensa.com/TreSensaCoreClient/tresensasdk/trunk/gamebuild/package.json --force'
					'npm install'
				].join('&&')
			bootstrap_leaderboard:
				options:
					stdout: true
					stderr: true
				command: [
					'svn export https://svn.tresensa.com/TresensaCoreClient/ClientSDKs/trunk/StudioKit/starter_template/leaderboard'
				].join('&&')
			native_log:
				options:
					stdout: true
					stderr: true
				command: [
					"tail -f dist_phonegap/platforms/<%= nativeBuild %>/cordova/console.log"
				].join('&&')
			kill_sim:
				command: 'killall "iPhone Simulator"'
			kill_xcode:
				command: 'killall "Xcode"'
			launch_xcode:
				command: "open 'dist_phonegap/platforms/ios/<%= consoleProperties.title %>.xcodeproj'"
			tail_log:
				options:
					stdout: true
				command: "tail -f dist_phonegap/platforms/<%= nativeBuild %>/cordova/console.log"
			open_android_release:
				options:
					stdout: true
					stderr: true
				command: "open dist_releases/android"
			bower_install_libs:
				options:
					stdout: true
					stderr: true
				command: './node_modules/bower/bin/bower install tresensa/tgs tresensa/tgl tresensa/tge'

		env:
			node_bin:
				unshift:
					PATH:
						'value': '../node_modules/.bin'
						'delimiter': ':'

		phonegap:
			config:
				root: 'dist/<%= gameConfig.VERSION %>'
				config:
					template: 'cordova/config.xml'
					data:
						id: -> grunt.config('buildConfig.nativeId') or grunt.config.process('com.tresensa.<%= gameConfig.GAME_ID %>')
						version: '<%= gameConfig.VERSION %>'
						name: '<%= consoleProperties.title %>'
						orientation: '<%= gameConfig.ORIENTATION %>'
						billing_key: '<%= consoleProperties.android_billing_key %>'
						orientationModes: if gameConfigContext.GameConfig.ORIENTATION == 'landscape'
								"""
									<string>UIInterfaceOrientationLandscapeLeft</string>
									<string>UIInterfaceOrientationLandscapeRight</string>
								"""
							else 
								"""
									<string>UIInterfaceOrientationPortrait</string>
								"""
						customFonts: ->
							strings = ("<string>www/#{font}</string>" for font in grunt.config("buildConfig.custom_fonts") || [])
							strings.join('\n')

				cordova: 'cordova'
				path: 'dist_phonegap'
				plugins: ->
					p = [
						'org.apache.cordova.device'
						'org.apache.cordova.network-information'
						'org.apache.cordova.vibration'
						'org.apache.cordova.console'
						'org.apache.cordova.inappbrowser'

						'https://github.com/leecrossley/cordova-plugin-social-message.git'

						'<%= personalConfig.clientSDKDir %>/Cordova3Plugins/AppleIAP'
						'<%= personalConfig.clientSDKDir %>/Cordova3Plugins/GameCenterPlugin'
						'<%= personalConfig.clientSDKDir %>/Cordova3Plugins/GAPlugin'
						'<%= personalConfig.clientSDKDir %>/Cordova3Plugins/MixPanelPlugin'
						'<%= personalConfig.clientSDKDir %>/Cordova3Plugins/LaunchExternal'
					]

					if grunt.config('nativeSubBuild') is 'wildtangent'
						p.push '<%= personalConfig.clientSDKDir %>/Cordova3Plugins/WildTangentPlugin'
					else
						p.push '<%= personalConfig.clientSDKDir %>/Cordova3Plugins/InAppBilling'
						p.push '<%= personalConfig.clientSDKDir %>/Cordova3Plugins/ADXPlugin'

					return (grunt.config.process s for s in p)

				platforms: ['ios', 'android']
				maxBuffer: 1000
				verbose: true
				releases: 'dist_releases'
				releaseName: -> grunt.config('consoleProperties.title') + '-' + grunt.config('gameConfig.VERSION')
				name: -> grunt.config('consoleProperties.title');

				key:
					store: '<%= personalConfig.clientSDKDir %>/certs/tresensa-release-key.keystore'
					alias: 'tresensa'
					aliasPassword: -> grunt.config('personalConfig.android_store_password')
					storePassword: -> grunt.config('personalConfig.android_store_password')

				icons:
					android:
						ldpi: 'cordova/icons/36x36.png'
						mdpi: 'cordova/icons/48x48.png'
						hdpi: 'cordova/icons/72x72.png'
						xhdpi: 'cordova/icons/96x96.png'
					ios:
						# icon29: 'cordova/icons/29x29.png',
						# icon29x2: 'cordova/icons/58x58.png',
						# icon40: 'cordova/icons/40x40.png',
						# icon40x2: 'cordova/icons/80x80.png',
						# icon50: 'cordova/icons/40x40.png',
						# icon50x2: 'cordova/icons/80x80.png',
						icon57: 'cordova/icons/57x57.png',
						icon57x2: 'cordova/icons/114x114.png',
						icon60: 'cordova/icons/60x60.png',
						icon60x2: 'cordova/icons/120x120.png',
						icon72: 'cordova/icons/72x72.png',
						icon72x2: 'cordova/icons/144x144.png',
						icon76: 'cordova/icons/76x76.png',
						icon76x2: 'cordova/icons/152x152.png'

				screens:
				# 	android:
				# 		ldpi: 'screen-ldpi-portrait.png'
				# 		# landscape version
				# 		ldpiLand: 'screen-ldpi-landscape.png'
				# 		mdpi: 'screen-mdpi-portrait.png'
				# 		# landscape version
				# 		mdpiLand: 'screen-mdpi-landscape.png'
				# 		hdpi: 'screen-hdpi-portrait.png'
				# 		# landscape version
				# 		hdpiLand: 'screen-hdpi-landscape.png'
				# 		xhdpi: 'screen-xhdpi-portrait.png'
				# 		# landscape version
				# 		xhdpiLand: 'www/screen-xhdpi-landscape.png'
					ios:
						ipadLand: 'cordova/splash/1024x768.png',
						ipadLandx2: 'cordova/splash/2048x1536.png',
						ipadPortrait: 'cordova/splash/768x1024.png',
						ipadPortraitx2: 'cordova/splash/1536x2048.png',
						iphonePortrait: 'cordova/splash/320x480.png',
						iphonePortraitx2: 'cordova/splash/640x960.png',
						iphone568hx2: 'cordova/splash/640x1136.png'

				versionCode: -> grunt.config('gameConfig.VERSION').replace(/\./g, '')
				versionName: "<%= gameConfig.VERSION %>"

				minSdkVersion: -> 10
				targetSdkVersion: -> 19

				# iOS7-only options that will make the status bar white and transparent
				# iosStatusBar: 'WhiteAndTransparent'


	# Load external libraries
	grunt.loadNpmTasks "grunt-contrib-uglify"
	grunt.loadNpmTasks "grunt-contrib-clean"
	grunt.loadNpmTasks "grunt-contrib-concat"
	grunt.loadNpmTasks "grunt-contrib-copy"
	grunt.loadNpmTasks 'grunt-contrib-cssmin'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks "grunt-contrib-compress"
	grunt.loadNpmTasks 'grunt-aws-s3'
	grunt.loadNpmTasks 'grunt-shell'
	grunt.loadNpmTasks 'grunt-rsync'

	# only load ios stuff on mac
	if os.type() is "Darwin"
		grunt.loadNpmTasks 'grunt-phonegap'
		grunt.loadNpmTasks 'grunt-env'

	# exclude GameConfig.SOURCE, GameConfig.CSS and GameConfig.EXCLUDE from being copied to dist
	do ->
		copyFiles = grunt.config("copy.game.src")
		sources = grunt.config("gameConfig.SOURCE")
		copyFiles.push "!#{source}" for source in sources
		csses = grunt.config("gameConfig.CSS")
		copyFiles.push "!#{css}" for css in csses
		excludes = grunt.config("gameConfig.EXCLUDE")
		copyFiles.push "!#{exclude}" for exclude in excludes

		# ignore lib-debug unless GameConfig.DEBUG is true	
		copyFiles.push("!js/lib-debug/**") unless grunt.config("gameConfig.DEBUG")

		grunt.config("copy.game.src", copyFiles)


	getLocalIp = ->
  		ifaces=os.networkInterfaces()
  		lookupIpAddress = "localhost"
  		for own name, devices of ifaces when name == "en0" || name == "en1"
  			for details in devices
  				if details.family is 'IPv4'
  					lookupIpAddress = details.address
  					break

  		return lookupIpAddress

	grunt.registerTask "checkFavicon", ->
		done = this.async()
		url = grunt.config.process('http://games.tresensa.com/<%= consoleProperties.slug %>/favicon.ico')
		grunt.log.write("Checkin for favicon (#{url})...")
		require('request') url, (error, response, body) ->
			if !error && response.statusCode == 200
				grunt.log.ok()
			else
				grunt.fail.fatal "No favicon found"
			done()


	grunt.registerTask "test", ->
		console.log grunt.config("consoleProperties").slug

	# Create server task with special handling for lib-debug
	grunt.registerTask 'connect', 'Start a custom static web server.', ->
		connect = require('connect')
		injectLiveReload = require('connect-livereload')
		open = require('open')
		
		this.async()
		server = connect()

		if grunt.config("gameConfig.DEBUG")
			clientSDKDir = grunt.config("personalConfig.clientSDKDir")
			if clientSDKDir
				grunt.log.writeln("GameConfig set to DEBUG, mounting #{clientSDKDir}/dist as lib-debug and enabling livereload")
				grunt.log.writeln("Run `grunt dev` in client SDK folder to update automatically while editing")
				server.use(injectLiveReload(port: 35730))
				server.use(grunt.config.process('/<%= gameConfig.VERSION %>/js/lib-debug/'), connect.static(clientSDKDir + "/dist"))
			else
				grunt.log.writeln("GameConfig set to DEBUG but no `clientSDKDir` found in ~/.tresensa/buildConfig.json, using local lib-debug folder")


		server.use(connect.static('dist'))
		server.listen(8080).on 'listening', ->
			host = getLocalIp()
			grunt.log.ok("Started static web server on http://#{host}:8080");
			# open("http://localhost:8080")

	# Create tasks
	grunt.registerTask "copy:qa", ["copy:game", "copy:cssQA", "copy:jsQA", "copy:tgSDK"]
	grunt.registerTask "copy:prod", ->
		grunt.task.run ["copy:game"]
		unless grunt.config("gameConfig.PROD_ENV") or grunt.config('nativeBuild')
			grunt.log.writeln "PROD_ENV disabled in GameConfig, including lib dir"
			grunt.task.run "copy:tgSDK"

	grunt.registerTask "build:qa", ["clean", "copy:qa" , "buildIndex", "buildGameConfig", "buildFirefoxManifest", "buildAmazonManifest", "concat", 'buildAppcache']
	grunt.registerTask "build:prod", ["clean", "copy:prod" , "cssmin:game_css", "buildIndex", "buildGameConfig", "buildFirefoxManifest", "buildAmazonManifest", "uglify", 'buildAppcache']
	grunt.registerTask "build", (type) ->
		tasks = []
		if grunt.config("gameConfig.PROD_ENV")
			grunt.log.writeln "Defaulting to PROD based on GameConfig"
			tasks.push "build:prod"
		else
			grunt.log.writeln "Defaulting to QA based on GameConfig"
			tasks.push "build:qa"

		if type is 'ios' || type is 'android'
			tasks.push 'copy:tgSDK'
			grunt.config 'nativeBuild', type
		else if type is "wildtangent"
			tasks.push 'copy:tgSDK'
			grunt.config 'nativeBuild', 'android'
			grunt.config 'nativeSubBuild', 'wildtangent'

		grunt.task.run(tasks)

	grunt.registerTask "server", ["build", "connect"]

	grunt.registerTask "update", ["shell:update"]

	grunt.registerTask "manualUpload", ->
		grunt.log.ok grunt.config.process("You can now manually upload your dist/ directory to /var/www/qa-games.tresensa.com/<%= consoleProperties.slug %>/ on qa-games.tresensa.com.")

	grunt.registerTask "deploy", (env = "qa") ->
		env = env.toLowerCase()
		if (env is 'prod' or env is 'ios' or env is 'android' or env is 'wildtangent' or env is "zip") and !grunt.config("gameConfig.PROD_ENV")
			grunt.fail.warn "Attempting to deploy to PROD environment or native build with PROD_ENV set to false in GameConfig"

		if env is 'ios'
			grunt.task.run ["env:node_bin", "shell:bower_install_libs", "shell:kill_xcode", "build:ios", "copy:bowerComponents", 'phonegap:build:ios', 'shell:launch_xcode']
		else if env is 'android'
			grunt.task.run ["env:node_bin", "shell:bower_install_libs", "build:android", "copy:bowerComponents", 'phonegap:build:android', 'phonegap:release:android', 'shell:open_android_release']
		else if env is 'wildtangent'
			grunt.task.run ["env:node_bin", "shell:bower_install_libs", "build:wildtangent", "copy:bowerComponents", 'phonegap:build:android', 'phonegap:release:android', 'shell:open_android_release']
		else 
			grunt.config "deploying", env

			buildSteps = ["build"]
			if env is "zip"
				grunt.task.run ["shell:bower_install_libs", "build", "copy:bowerComponents", "compress:zip"]
			else if env is 'prod'
				grunt.task.run ["checkFavicon", "build", "aws_s3:#{env}"]
			else
        grunt.task.run ["build", "aws_s3:#{env}"]
				# THE-683 reverting back to AWS S3 for qa-games.tresensa.com
				#if os.platform() is "win32"
				#	grunt.task.run ["build", "manualUpload"]
				#else
				#	grunt.task.run ["build", "rsync:qa"]

	grunt.registerTask "run:ios", ["env:node_bin", 'shell:bower_install_libs', 'build:ios', 'copy:bowerComponents', 'phonegap:build:ios', 'shell:kill_sim', 'phonegap:run:ios', 'shell:tail_log']
	grunt.registerTask "run:android", ["env:node_bin", 'shell:bower_install_libs', 'build:android', 'copy:bowerComponents', 'phonegap:build:android', 'phonegap:run:android']
	grunt.registerTask "run:wildtangent", ["env:node_bin", 'shell:bower_install_libs', 'build:wildtangent', 'copy:bowerComponents', 'phonegap:build:android', 'phonegap:run:android']

	grunt.registerTask 'buildFirefoxManifest', ->
		grunt.log.write("Building firefox manifest.webapp...")
		templateData = _.defaults {}, grunt.config("consoleProperties"),
			orientation: grunt.config("gameConfig.ORIENTATION")
		manifestText = grunt.template.process firefoxManifestTemplate, data: templateData
		grunt.file.write grunt.config.process('<%= distDir%>manifest.webapp'), manifestText
		grunt.log.ok()

	grunt.registerTask 'buildAmazonManifest', ->
		df = require 'dateformat'
		grunt.log.write("Building amazon web-app-manifest.json...")
		templateData =
			version: grunt.config("gameConfig.VERSION")
			amazon_app_key: grunt.config("partnerProperties.amazon_app_key")
			dateStamp: df(new Date(), "UTC:yyyy-mm-dd HH:MM:sso") 
			permissions: if grunt.config('partnerProperties.has_iap') then "['iap']" else '[]'
		manifestText = grunt.template.process amazonManifestTemplate, data: templateData
		grunt.file.write grunt.config.process('<%= distDir%>web-app-manifest.json'), manifestText
		grunt.log.ok()

	grunt.registerTask "buildGameConfig", ->
		grunt.log.write("Building GameConfig.js...")
		gc = grunt.config("gameConfig")

		gc.PATH = "/"
		gc.HOST = "http://#{consoleProperties.slug}.tresensa.com"
		gc.TITLE = consoleProperties.title

		if grunt.config('deploying') is 'zip'
			gc.LIB_DIR ?= "js/lib/"

		# @TODO this can be removed once we redeploy all games and remove check from TGL
		gc.UNVERSIONED_LOAD = true

		outputConfig = "var GameConfig = #{JSON.stringify(gc, null, if gc.PROD_ENV && !gc.DEBUG then 0 else 4)};"
		grunt.file.write grunt.config.process('<%= distDir %><%= gameConfig.VERSION %>/js/GameConfig.js'), outputConfig
		grunt.log.ok()

	grunt.registerTask "buildIndex", ->
		cheerio = require "cheerio"

		if grunt.file.exists("index.html")
			indexText = grunt.file.read("index.html")
			$ = cheerio.load(indexText)

			# Find external script tags and warn
			ignoreScripts = [
				"js/lib/head.load.min.js"
				"js/lib/tgl/tgl.boot.min.js"
			]
			externalScriptTags = $("script[src]")
			files = _.compact (externalScriptTags.map ->
				src = $(@).attr("src")
				if src in ignoreScripts then null else src
			).toArray()
			if files.length
				grunt.log.warn "Found external js filex in index. Consider adding them to GameConfig:"
				grunt.log.writeln("SOURCE: " + JSON.stringify(files, null, 4)+",")

			# Find external css tags and warn
			ignoreStyles = [
				"style.css"
				"leaderboard/css/base.css"
				"leaderboard/css/game_specific.css"
			]
			externalCssTags = $("link[rel='stylesheet'][href]")
			files = _.compact (externalCssTags.map ->
				src = $(@).attr("href")
				if src in ignoreStyles then null else src
			).toArray()
			if files.length
				grunt.log.warn "Found external css filex in index. Consider adding them to GameConfig:"
				grunt.log.writeln("CSS: " + JSON.stringify(files, null, 4)+",")
			
			# Copy any extra head info as indicated by comments
			extraHeadRegex = /<!-- TGL:KEEP -->([\s\S]+)<!-- TGL:KEEP:END -->/
			headExtra = indexText.match(extraHeadRegex)?[1] or ""

			# Copy body and viewport
			bodyText = $("body").html().trim()
			viewport = $("mata[name=viewport]").attr("content")
			bodyId = $("body").attr('id');
			bodyClass = $("body").attr('class');
		else
			grunt.log.writeln "using default TGE body template"

		templateData = _.defaults {}, grunt.config("consoleProperties"),
			kikScript: ""
			cordovaScript: if grunt.config("nativeSubBuild") is 'wildtangent'
					"<script src='js/CordovaConfig-#{grunt.config("nativeBuild")}.js'></script><script src='cordova.js'></script><script tye='text/javascript'>CordovaConfig.DST_ID = 'A0050'</script>"
				else if grunt.config("nativeBuild")
					"<script src='js/CordovaConfig-#{grunt.config("nativeBuild")}.js'></script><script src='cordova.js'></script>"
				else
					''
			viewport: viewport or "initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
			twitterSite: if grunt.config("consoleProperties.twitter_username") != ""
				"<meta name=\"twitter:site\" content=\"@#{grunt.config('consoleProperties.twitter_username')}\"/>"
			else 
				''	
			bootScript: if grunt.config('nativeBuild')
					"js/lib/tgl/tgl.boot.min.js"
				else if grunt.config("gameConfig.DEBUG") 
					"js/lib-debug/tgl/tgl.boot.js"
				else if grunt.config("gameConfig.LIB_DIR")
					"#{grunt.config('gameConfig.LIB_DIR')}tgl/tgl.boot.min.js"
				else if grunt.config("deploying") is "zip"
					"js/lib/tgl/tgl.boot.min.js"
				else
					"//sdk.tresensa.com/tgl/tgl.boot.min.js"
			body: if bodyText is "" then bodyText else bodyText or defaultBody
			bodyId: bodyId or ""
			bodyClass: bodyClass or ""
			bodyExtra: if grunt.config("gameConfig.TGE.ENABLED") then TGEStyle else ""
			headExtra: headExtra or ""
			cacheManifest: if grunt.config("deploying") && grunt.config("gameConfig.APPCACHE.ENABLED") != false then ' manifest="cache.manifest"' else ''
			canonical: grunt.config.process "https://<%= consoleProperties.slug %>.tresensa.com/"
			baseHref: grunt.config.process if grunt.config('nativeBuild')
				""
			else if grunt.config('deploying') is 'zip'
				"./<%= gameConfig.VERSION %>/"   
			else if grunt.config('deploying') is 'prod'
				"http://games.tresensa.com/<%= consoleProperties.slug %>/<%= gameConfig.VERSION %>/"   
			else if grunt.config('deploying') is 'qa'
				"//qa-games.tresensa.com/<%= consoleProperties.slug %>/<%= gameConfig.VERSION %>/"    
			else
				"//#{getLocalIp()}:8080/<%= gameConfig.VERSION %>/"   

		# fill the template and generate the index file
		indexText = grunt.template.process (if grunt.config('deploying') is 'prod' then redirectIndexTemplate else indexTemplate), data: templateData
		homeText = grunt.template.process indexTemplate, data: templateData
		# console.log indexText
		# console.log homeText

		# fill template for kik.html and generate it
		templateData.canonical += "kik.html?dst=A0020"
		templateData.kikScript = "<script src=\"//cdn.kik.com/kik/1.0.9/kik.js\"></script>"
		kikIndexText = grunt.template.process (if grunt.config('deploying') is 'prod' then redirectIndexTemplate else indexTemplate), data: templateData
		# console.log kikIndexText

		grunt.log.write("Building index.html...")
		grunt.file.write grunt.config.process('<%= distDir %>/index.html'), indexText
		grunt.file.write grunt.config.process('<%= distDir %><%= gameConfig.VERSION %>/index.html'), indexText
		grunt.log.ok()

		unless grunt.config('nativeBuild') or grunt.config('deploying') is 'zip'
			grunt.log.write("Building home.html...")
			grunt.file.write grunt.config.process('<%= distDir %>/home.html'), homeText
			grunt.file.write grunt.config.process('<%= distDir %><%= gameConfig.VERSION %>/home.html'), indexText
			grunt.log.ok()
			grunt.log.write("Building kik.html...")
			grunt.file.write grunt.config.process('<%= distDir %>/kik.html'), kikIndexText
			grunt.file.write grunt.config.process('<%= distDir %><%= gameConfig.VERSION %>/kik.html'), kikIndexText
			grunt.log.ok()

	grunt.registerTask "bootstrap", ->
		cheerio = require "cheerio"
		slug = require "slug"

		config = grunt.config('gameConfig')

		newGameConfig = gameConfigTxt.replace(/RESOURCES:.*,/, '').replace(/HOST:.*,/, '').replace(/PATH:.*,/, '').replace(/CANVAS_ID:.*,/, '').replace(/REORIENT_ID:.*,/, '').replace(/PRELOADER_DIV:.*,/, '')
		if gameConfigTxt != newGameConfig
			grunt.log.write("Removing HOST, PATH, CANVAS_ID, PRELOADER_DIV, RESOURCES, and REORIENT_ID from GameConfig...")
			grunt.file.write "js/GameConfig.js", newGameConfig
			grunt.log.ok()
		else
			grunt.log.ok("GameConfig does not have any deprecated properties...skipping")

		if grunt.file.isDir("leaderboard")
			grunt.log.ok("leaderboard exists...skipping")
		else
			grunt.log.write("Leaderboard files missing, downloading...")
			grunt.task.run("shell:bootstrap_leaderboard")
			grunt.log.ok()

		if !grunt.config('gameConfig.TGE.ENABLED') or !grunt.file.exists("index.html")
			grunt.log.ok("index.html already remvoed or not a TGE game...skipping")
		else
			indexText = grunt.file.read("index.html")
			$ = cheerio.load(indexText)

			# Default just a viewporter tag, safe to delete
			safeToDelete = if $("body").children().length is 1 and $("body #viewporter").length then true
			# Old div format, still safe to delete
			else if $("body").children().length is 3 and $("body #viewporter").length and $("body #wrong_orientation").length and $("body #fb-root").length then true
			# Anything else is not safe to delete
			else false

			if safeToDelete
				grunt.log.write("Deleting old index.html as it is no longer used by TGE games...")
				grunt.file.delete("index.html")
				grunt.log.ok()
			else
				grunt.log.warn "Detected non standard <body> elemetns not removing index.html"

		if ignoredBuildconfigProps.length
			newBuildconfig = _.pick(buildConfig, allowedBuildconfigProps)
			if _.isEmpty(newBuildconfig)
				grunt.log.write("buildconfig.json only contains deprecated properties, deleting...")
				grunt.file.delete("buildConfig.json")
			else
				grunt.log.write("Removing #{ignoredBuildconfigProps.length} deprecated properties from buildConfig.json...")
				grunt.file.write "buildConfig.json", JSON.stringify(newBuildconfig, null, 4)
			grunt.log.ok()

		deleteFiles = ['index-firefox.html', 'advertisement.html', 'apple-touch-icon.png', 'manifest.webapp', 'cache.manifest', "web-app-manifest.json"]
		for file in deleteFiles
			if grunt.file.exists(file)
				grunt.log.write("Deleting #{file} as it is no longer used...")
				grunt.file.delete(file)
				grunt.log.ok()
			else
				grunt.log.ok("#{file} already remvoed...skipping")

		if !grunt.file.isDir('cordova')
			grunt.log.write("Downloading native icons/splashes")
			grunt.file.mkdir('cordova')
			grunt.file.mkdir('cordova/icons')
			grunt.file.mkdir('cordova/splash')


			grunt.task.run 'aws_s3:download_icons'
			grunt.log.ok()


		grunt.log.write("Updating cordova config.xml template...")
		nativeId = grunt.config('buildConfig.nativeId') or "com.tresensa.#{grunt.config('gameConfig.GAME_ID')}"
		grunt.file.write "cordova/config.json", grunt.config.process("""
			{"id":"#{nativeId}","name":"#{consoleProperties.title}"}
		""") 
		grunt.file.write "cordova/config.xml", cordovaConfigXML
		grunt.log.ok()

		grunt.log.ok "Done bootstrapping"


	grunt.registerMultiTask "buildAppcache", ->
		excludedAssets = grunt.config("gameConfig.APPCACHE.EXCLUDE") || []
		excludedAssets = excludedAssets.map (file) -> "!#{file}"

		# Gather files and variables to fill the template
		files = grunt.file.expand {filter: "isFile", cwd: grunt.config("distDir")}, @data.localFiles.concat(excludedAssets)
		appCacheText = grunt.template.process manifestTemplate, data:
			dateStamp: new Date()
			files: files.map(encodeURI).join('\n')
			cdnDomain: if grunt.config("deploying") is 'zip'
					grunt.config.process("<%= gameConfig.VERSION %>/js/lib/")
				else if grunt.config("gameConfig.PROD_ENV")
					"//sdk.tresensa.com/"
				else
					grunt.config.process("<%= gameConfig.VERSION %>/js/lib/")
			favicon: if grunt.config('deploying') is 'prod'
					"favicon.ico"
				else
					""
			tglVersion: grunt.config("gameConfig.TGL.VERSION")
			tgeVersion: grunt.config("gameConfig.TGE.VERSION")
			tgsVersion: grunt.config("gameConfig.TGS.VERSION")

		# console.log appCacheText


		# Write out cache.manifest
		grunt.log.write("Writing cache.manifest...")
		grunt.file.write grunt.config.process('<%= distDir%>/cache.manifest'), appCacheText
		grunt.log.ok()

	grunt.registerTask "default", "server"
