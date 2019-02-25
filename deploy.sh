dotnet publish -c Release 

cp dockerfile ./bin/release/netcoreapp2.2/publish

docker build -t saving-app-image ./bin/release/netcoreapp2.2/publish

docker tag saving-app-image registry.heroku.com/saving-app/web

docker push registry.heroku.com/saving-app/web

heroku container:release web -a saving-app

# sudo chmod 755 deploy.sh
# ./deploy.sh