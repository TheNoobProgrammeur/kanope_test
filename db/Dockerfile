FROM mongo

COPY user_provisioning.json /init.json
CMD mongoimport --host mongodb --db testKanope --collection users --type json --file /init.json --jsonArray