#!/bin/sh
set -x
echo "Deploying to PREPROD..."
#rsync -a --info=progress2 ../panoteq-new u98043085@access792237198.webspace-data.io:temp
rsync -a --info=progress2 ../panoteq-new/modules/panoteq u98043085@access792237198.webspace-data.io:modules
rsync -a --info=progress2 ../panoteq-new/themes/theme_wenro13/assets/js u98043085@access792237198.webspace-data.io:themes/theme_wenro13/assets
echo "DONE."
