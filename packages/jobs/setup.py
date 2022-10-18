from setuptools import setup

setup(
    name="avioes_na_web",
    description="Aviões na Web. Crie rankings e comparativos entre aviões",
    install_requires=[
        "parsel==1.6.0",
        "requests==2.24.0",
        "pymongo==3.11.0",
        "python-decouple==3.3",
    ],
    setup_requires=["pytest-runner"],
    tests_require=["pytest"],
    entry_points={
        "console_scripts": [
            "wiki-scraper=scraper:get_airplanes",
        ],
    },
)
