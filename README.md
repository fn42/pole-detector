## what is it?

> (semi) fork of: https://github.com/render-examples/fastai-v3

a web ui to upload images and run classification models on them

## run locally

test your changes locally by installing Docker and using the following command:

```
docker build -t claz-ui . && docker run --rm -it -p 5000:5000 claz-ui
```

## run on a server

### install packages

create python(3) virtual env

```bash
sudo apt-get install python3-venv -y
python3 -m venv ~/my_py3_venv
source ~/my_py3_venv/bin/activate
```

install all the packages:

```bash
sudo apt-get install pip3
```

```bash
sudo -H pip3 -v install --upgrade -r requirements.txt --no-cache-dir
```

> _if going out of memory during the install (i.e. `Killed` because of it) add some temp swap:_

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
```

### link the model

model is expected to live on the same server and symlinked from under the /app:

```bash
$ ll app/
total 16
drwxr-xr-x 2 user group 4096 Jul 17 15:06 models
drwxr-xr-x 3 user group 4096 Jul 17 15:07 static
drwxr-xr-x 2 user group 4096 Jul 17 15:07 view
lrwxrwxrwx 1 user group   31 Jul 17 16:19 model.pkl -> ../../../drop/model.pkl  ## link to wherever the model is
-rw-r--r-- 1 user group 1917 Jul 17 18:00 server.py
```

### run the app

```bash
python app/server.py serve
```
