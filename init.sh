mysql.server start
cd $(dirname $0)
./init0.sh & nodemon ./bin/www open
