from distutils.core import setup
import py2exe

setup(
	console=['interface.py'],
	options={
        "py2exe":{
        "packages": [
        	"appdirs",
        	"packaging"
        	]
        }
    }
)