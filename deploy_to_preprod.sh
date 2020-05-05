#!/bin/sh
echo "Deploying to PREPROD..."
rsync -a --info=progress2 ../panoteq-new u98043085@access792237198.webspace-data.io:temp
echo "DONE."
