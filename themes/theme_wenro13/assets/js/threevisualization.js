function Panoteq3dViewer() {
}

Panoteq3dViewer.prototype.debug = false;

Panoteq3dViewer.prototype.debugLog = function (msg) {
    if (this.debug) {
        console.log(msg);
    }
};

Panoteq3dViewer.prototype.container = null;
Panoteq3dViewer.prototype.stats = null;
Panoteq3dViewer.prototype.controls = null;
Panoteq3dViewer.prototype.camera = null;
Panoteq3dViewer.prototype.scene = null;
Panoteq3dViewer.prototype.renderer = null;
Panoteq3dViewer.prototype.light = null;
Panoteq3dViewer.prototype.clock = new THREE.Clock();
Panoteq3dViewer.prototype.mixers = [];

Panoteq3dViewer.prototype.effectComposer = null;
Panoteq3dViewer.prototype.ssaoPass = null;
Panoteq3dViewer.prototype.group = null;

Panoteq3dViewer.prototype.backPanelsMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false});

Panoteq3dViewer.prototype.loader = new THREE.FBXLoader();

Panoteq3dViewer.prototype.model = [];

Panoteq3dViewer.prototype.params = {
    shininess: 30.0,
    lightsIntensityFactor: 100.0
};

Panoteq3dViewer.prototype.numMaterialsLoaded = 0;

Panoteq3dViewer.prototype.modelsDirectory = '/threemodels/';

Panoteq3dViewer.prototype.texturesHasHorizontal = {
    // Brillant
    'BrillantWhite.jpg': false,
    'BrillantGenet.jpg': false,
    'BrillantLagon.jpg': false,
    'BrillantGrisFoncé.jpg': false,
    // Uni
    'Beige.jpg': false,
    'Brun.jpg': false,
    'BlancNeige.jpg': false,
    'A-Laquer.jpg': false,
    'Argile.jpg': false,
    'Malaga.jpg': false,
    'RougeFoncé.jpg': false,
    'BlancLisse.jpg': false,
    'Macadam.jpg': false,
    'Mineral.jpg': false,
    'BleuCaraibe.jpg': false,
    'NoireGrainé.jpg': false,
    // Structuré - Horizontal
    'CheneDeFil.jpg': true,
    'Ebene.jpg': true,
    'Chene Brun Brossé.jpg': true,
    'AcaciaBlanc.jpg': true,
    'PinAnthraciteBrossé.jpg': true,
    'PinEcruBrossé.jpg': true,
    'PinSabléBrossé.jpg': true,
    'CotonStructuré.jpg': true,
    'NoirStructuré.jpg': true,
    'CheneDoré.jpg': true,
    'CheneScieNaturel.jpg': true,
    'CheneGris.jpg': true,
    'Ambassador.jpg': true,
    'LinGris.jpg': true,
    'VertAnisseBrossé.jpg': true,
    // Nouveaux
    'BlancSerica.jpg': false,
    'BrillantAluBrossé-(2).jpg': false,
    'BrillantBeigeSahara.jpg': false,
    'BrillantPimentRose.jpg': false,
    'CassisBrillant.jpg': false,
    'NoirLisse.jpg': false
};

Panoteq3dViewer.prototype.texturesShininess = {
    // Brillant
    'BrillantWhite.jpg': 120,
    'BrillantGenet.jpg': 100,
    'BrillantLagon.jpg': 100,
    'BrillantGrisFoncé.jpg': 100,
    // Uni
    'Beige.jpg': 40,
    'Brun.jpg': 40,
    'BlancNeige.jpg': 0,
    'A-Laquer.jpg': 0,
    'Argile.jpg': 40,
    'Malaga.jpg': 40,
    'RougeFoncé.jpg': 40,
    'BlancLisse.jpg': 0,
    'Macadam.jpg': 40,
    'Mineral.jpg': 40,
    'BleuCaraibe.jpg': 40,
    'NoireGrainé.jpg': 25,
    // Structuré - Horizontal
    'CheneDeFil.jpg': 5,
    'Ebene.jpg': 5,
    'Chene Brun Brossé.jpg': 5,
    'AcaciaBlanc.jpg': 5,
    'PinAnthraciteBrossé.jpg': 5,
    'PinEcruBrossé.jpg': 5,
    'PinSabléBrossé.jpg': 5,
    'CotonStructuré.jpg': 5,
    'NoirStructuré.jpg': 5,
    'CheneDoré.jpg': 5,
    'CheneScieNaturel.jpg': 5,
    'CheneGris.jpg': 5,
    'Ambassador.jpg': 5,
    'LinGris.jpg': 5,
    'VertAnisseBrossé.jpg': 5,
    // Nouveaux
    'BlancSerica.jpg': 0,
    'BrillantAluBrossé-(2).jpg': 65,
    'BrillantBeigeSahara.jpg': 25,
    'BrillantPimentRose.jpg': 100,
    'CassisBrillant.jpg': 75,
    'NoirLisse.jpg': 25
};

Panoteq3dViewer.prototype.lightsIntensitiesFactors = {
    // Brillant
    'BrillantWhite.jpg': 80,
    'BrillantGenet.jpg': 100,
    'BrillantLagon.jpg': 100,
    'BrillantGrisFoncé.jpg': 100,
    // Uni
    'Beige.jpg': 85,
    'Brun.jpg': 85,
    'BlancNeige.jpg': 75,
    'A-Laquer.jpg': 75,
    'Argile.jpg': 85,
    'Malaga.jpg': 85,
    'RougeFoncé.jpg': 85,
    'BlancLisse.jpg': 60,
    'Macadam.jpg': 85,
    'Mineral.jpg': 60,
    'BleuCaraibe.jpg': 85,
    'NoireGrainé.jpg': 80,
    // Structuré - Horizontal
    'CheneDeFil.jpg': 75,
    'Ebene.jpg': 75,
    'Chene Brun Brossé.jpg': 75,
    'AcaciaBlanc.jpg': 65,
    'PinAnthraciteBrossé.jpg': 75,
    'PinEcruBrossé.jpg': 75,
    'PinSabléBrossé.jpg': 75,
    'CotonStructuré.jpg': 75,
    'NoirStructuré.jpg': 75,
    'CheneDoré.jpg': 75,
    'CheneScieNaturel.jpg': 70,
    'CheneGris.jpg': 75,
    'Ambassador.jpg': 75,
    'LinGris.jpg': 75,
    'VertAnisseBrossé.jpg': 75,
    // Nouveaux
    'BlancSerica.jpg': 65,
    'BrillantAluBrossé-(2).jpg': 150,
    'BrillantBeigeSahara.jpg': 70,
    'BrillantPimentRose.jpg': 100,
    'CassisBrillant.jpg': 150,
    'NoirLisse.jpg': 80
};

Panoteq3dViewer.prototype.modelsFiles = {};
Panoteq3dViewer.prototype.modelsFiles['alto-porte'] = {
    path: 'alto_104.fbx',
    path_inverted: 'altoinv_100.fbx',
    type: 'alto',
    offsetSpeeds: {
        'middle': 0.6795,
        'middleY': 0.5,
        'right': -0.130,
        'left': -0.131,
        'bottom': -0.36,
        'top': -0.21
    }
};
Panoteq3dViewer.prototype.modelsFiles['disco-porte'] = {
    path: 'disco_101.fbx',
    type: 'disco',
    offsetSpeeds: {
        'middle': 0.696,
        'middleY': 0.47,
        'right': -0.134,
        'left': -0.134,
        'bottom': -0.289,
        'top': -0.288
    }
};

Panoteq3dViewer.prototype.modelsFiles['mandoline-porte'] = {
    path: 'mandoline_porte_102.fbx',
    type: 'mandoline',
    offsetSpeeds: {
        'middle': 0.5,
        'middleY': 0.5,
        'right': -0.127,
        'left': -0.128,
        'bottom': -0.322,
        'top': -0.322
    }
};

Panoteq3dViewer.prototype.modelsFiles['opera-porte'] = {
    path: 'opera_102.fbx',
    type: 'opera',
    offsetSpeeds: {
        'middle': 0.714,
        'middleY': 0.393,
        'right': 0.138,
        'left': 0.138,
        'bottom': 0.288,
        'top': 0.288
    }
};

Panoteq3dViewer.prototype.modelsFiles['tenor-porte'] = {
    path: 'tenor_102.fbx',
    type: 'tenor',
    offsetSpeeds: {
        'middle': 0.365,
        'middleY': 0.5,
        'right': 0.197,
        'left': 0.198,
        'bottom': 0.326,
        'top': 0.32
    }
};

Panoteq3dViewer.prototype.modelsFiles['atira-porte'] = {
    path: 'atira_103.fbx',
    path_inverted: 'atirainv_100.fbx',
    type: 'atira',
    offsetSpeeds: {
        'middle': 0.5,
        'middleY': 0.5,
        'right': -0.128,
        'left': -0.128,
        'bottom': -0.288,
        'top': -0.288
    }
};

Panoteq3dViewer.prototype.modelsFiles['tablo-porte'] = {
    path: 'tablo_104.fbx',
    type: 'tablo',
    offsetSpeeds: {
        'middle': 0.363,
        'middleY': 0.38,
        'right': -0.0928,
        'left': -0.093,
        'bottom': -0.188,
        'top': -0.19
    }
};

Panoteq3dViewer.prototype.prestashopParametersMappings = [];

Panoteq3dViewer.prototype.texturesDirectory = '';

Panoteq3dViewer.prototype.modelFile = null;
Panoteq3dViewer.prototype.textureFileName = null;


Panoteq3dViewer.prototype.createHtmlElement = function () {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
};

Panoteq3dViewer.prototype.createRenderer = function () {
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    var width = $(this.container).width();
    var height = $(this.container).height();
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.container.appendChild(this.renderer.domElement);
//                this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.enabled = false;
//    if (!this.renderer.extensions.get('WEBGL_depth_texture')) {
//        document.querySelector('#error').style.display = 'block';
//        return;
//    }
    this.container.appendChild(this.renderer.domElement);

//                this.ssaoPass = new THREE.SSAOPass(this.scene, this.camera, window.innerWidth, window.innerHeight);
//                this.ssaoPass.kernelRadius = 16;
//                this.ssaoPass.renderToScreen = true;
//                this.effectComposer = new THREE.EffectComposer(this.renderer);
//                this.effectComposer.addPass(this.ssaoPass);
//                        this.container.appendChild(this.effectComposer.domElement);

//                this.container.appendChild(this.effectComposer.domElement);
};

Panoteq3dViewer.prototype.repositionTextures = function () {
    this.repositionTexture();
};

Panoteq3dViewer.prototype.repositionTexture = function (panel) {
    var panel = this.params.middlePanel;

    if (panel.material.map == null) {
        return;
    }

    var origWidth = (panel.origWidth / 100.0);
    var newWidth = (panel.origWidth / 100) * panel.scale.x;
    var origHeight = (panel.origHeight / 100.0);
    var newHeight = (panel.origHeight / 100) * panel.scale.y;

    var middleOffsetSpeed = this.modelFile.offsetSpeeds.middle;
    var middleOffsetSpeedY = this.modelFile.offsetSpeeds.middleY;
    var rightOffsetSpeed = this.modelFile.offsetSpeeds.right;
    var leftOffsetSpeed = this.modelFile.offsetSpeeds.left;
    var bottomOffsetSpeed = this.modelFile.offsetSpeeds.bottom;
    var topOffsetSpeed = this.modelFile.offsetSpeeds.top;

    var repeatX = newWidth / origWidth;
    var offsetX = -repeatX * middleOffsetSpeed + middleOffsetSpeed;

    var repeatY = newHeight / origHeight;
    var offsetY = -repeatY * middleOffsetSpeedY + middleOffsetSpeedY;

//                this.debugLog('repeat X: ' + repeatX + ' - offsetX: ' + offsetX + ' - norm: ' + offsetXNormalized);
    this.debugLog('repeatX: ' + repeatX + ' - offsetX: ' + offsetX + ' - middle width: ' + newWidth + ' - orig width: ' + origWidth);

    this.params.middlePanel.material.map.repeat.x = repeatX;
    this.params.middlePanel.material.map.offset.x = offsetX;
    this.params.middlePanel.material.map.repeat.y = repeatY;
    this.params.middlePanel.material.map.offset.y = offsetY;

    this.params.topPanel.material.map.repeat.x = repeatX;
    this.params.topPanel.material.map.offset.x = offsetX;
    this.params.bottomPanel.material.map.repeat.x = repeatX;
    this.params.bottomPanel.material.map.offset.x = offsetX;

    this.params.leftPanel.material.map.repeat.y = repeatY;
    this.params.leftPanel.material.map.offset.y = offsetY;
    this.params.rightPanel.material.map.repeat.y = repeatY;
    this.params.rightPanel.material.map.offset.y = offsetY;

    this.params.rightPanel.material.map.offset.x = -repeatX * rightOffsetSpeed + rightOffsetSpeed;
    this.params.topRightPanel.material.map.offset.x = this.params.rightPanel.material.map.offset.x;
    this.params.bottomRightPanel.material.map.offset.x = this.params.rightPanel.material.map.offset.x;

    this.params.leftPanel.material.map.offset.x = repeatX * leftOffsetSpeed - leftOffsetSpeed;
    this.params.topLeftPanel.material.map.offset.x = this.params.leftPanel.material.map.offset.x;
    this.params.bottomLeftPanel.material.map.offset.x = this.params.leftPanel.material.map.offset.x;

    this.params.bottomPanel.material.map.offset.y = repeatY * bottomOffsetSpeed - bottomOffsetSpeed;
    this.params.bottomRightPanel.material.map.offset.y = this.params.bottomPanel.material.map.offset.y;
    this.params.bottomLeftPanel.material.map.offset.y = this.params.bottomPanel.material.map.offset.y;
    this.params.topPanel.material.map.offset.y = -repeatY * topOffsetSpeed + topOffsetSpeed;
    this.params.topRightPanel.material.map.offset.y = this.params.topPanel.material.map.offset.y;
    this.params.topLeftPanel.material.map.offset.y = this.params.topPanel.material.map.offset.y;

    this.debugLog('right offset = ' + this.params.rightPanel.material.map.offset.x);
};

Panoteq3dViewer.prototype.scaleModelHorizontally = function () {
    // Calculate scale depending on desired width
    var scaleX = (this.params.desiredWidth) / (this.params.middlePanel.origWidth);
    var totalWidth = this.params.middlePanel.origWidth + this.params.leftPanel.origWidth + this.params.rightPanel.origWidth;
    var middlePanelScaleCoeff = this.params.middlePanel.origWidth / totalWidth;
    this.params.middlePanel.scale.x = scaleX * this.params.middlePanel.originalScale.x * middlePanelScaleCoeff;

    var middlePanelNewWidth = (this.params.middlePanel.geometry.boundingBox.max.x - this.params.middlePanel.geometry.boundingBox.min.x)
        * this.params.middlePanel.scale.x;

    // Move left and right panels, and corners
    var widthDiff = this.params.middlePanel.origWidth - middlePanelNewWidth;
    this.params.leftPanel.position.x = this.params.leftPanel.originalPosition.x + widthDiff / 2.0;
    this.params.rightPanel.position.x = this.params.rightPanel.originalPosition.x - widthDiff / 2.0;
    this.params.topLeftPanel.position.x = this.params.leftPanel.position.x;
    this.params.bottomLeftPanel.position.x = this.params.leftPanel.position.x;
    this.params.topRightPanel.position.x = this.params.rightPanel.position.x;
    this.params.bottomRightPanel.position.x = this.params.rightPanel.position.x;

    // Rescale top and bottom panels
    var middlePanelScaleRatio = this.params.middlePanel.scale.x / this.params.middlePanel.originalScale.x;
    this.params.topPanel.scale.x = middlePanelScaleRatio * this.params.topPanel.originalScale.x;
    this.params.bottomPanel.scale.x = middlePanelScaleRatio * this.params.bottomPanel.originalScale.x;

    // Resize back panels
    this.params.backMiddle.scale.x = this.params.middlePanel.scale.x;
    this.params.backLeft.position.x = this.params.leftPanel.position.x;
    this.params.backRight.position.x = this.params.rightPanel.position.x;
    this.params.backTopLeft.position.x = this.params.topLeftPanel.position.x;
    this.params.backBottomLeft.position.x = this.params.bottomLeftPanel.position.x;
    this.params.backTopRight.position.x = this.params.topRightPanel.position.x;
    this.params.backBottomRight.position.x = this.params.bottomRightPanel.position.x;
    this.params.backBottom.scale.x = this.params.bottomPanel.scale.x;
    this.params.backTop.scale.x = this.params.topPanel.scale.x;

    // Resize back brown panels
    this.params.backMiddleBrown.scale.x = this.params.middlePanel.scale.x;
    this.params.backLeftBrown.position.x = this.params.leftPanel.position.x;
    this.params.backRightBrown.position.x = this.params.rightPanel.position.x;
    this.params.backTopLeftBrown.position.x = this.params.topLeftPanel.position.x;
    this.params.backBottomLeftBrown.position.x = this.params.bottomLeftPanel.position.x;
    this.params.backTopRightBrown.position.x = this.params.topRightPanel.position.x;
    this.params.backBottomRightBrown.position.x = this.params.bottomRightPanel.position.x;
    this.params.backBottomBrown.scale.x = this.params.bottomPanel.scale.x;
    this.params.backTopBrown.scale.x = this.params.topPanel.scale.x;

    // Texture
    this.repositionTextures();
};

Panoteq3dViewer.prototype.scaleModelVertically = function () {
    // Calculate scale depending on desired height
    var scaleY = (this.params.desiredHeight - this.params.bottomPanel.origHeight - this.params.topPanel.origHeight) / this.params.middlePanel.origHeight;
    this.params.middlePanel.scale.y = scaleY * this.params.middlePanel.originalScale.y;

    // 
    var middlePanelNewHeight = (this.params.middlePanel.geometry.boundingBox.max.y - this.params.middlePanel.geometry.boundingBox.min.y)
        * this.params.middlePanel.scale.y;

    // Move top and bottom panels, and corners
    var heightDiff = this.params.middlePanel.origHeight - middlePanelNewHeight;
    this.params.topPanel.position.z = this.params.topPanel.originalPosition.z + heightDiff / 2.0;
    this.params.bottomPanel.position.z = this.params.bottomPanel.originalPosition.z - heightDiff / 2.0;
    this.params.topLeftPanel.position.z = this.params.topPanel.position.z;
    this.params.topRightPanel.position.z = this.params.topPanel.position.z;
    this.params.bottomLeftPanel.position.z = this.params.bottomPanel.position.z;
    this.params.bottomRightPanel.position.z = this.params.bottomPanel.position.z;

    // Rescale left and right panels
    var totalHeight = this.params.middlePanel.origHeight;
    var middlePanelScaleCoeff = this.params.middlePanel.origHeight / totalHeight;
    var topPanelScaleCoeff = this.params.topPanel.origHeight / totalHeight;
    var bottomPanelScaleCoeff = this.params.bottomPanel.origHeight / totalHeight;
    var middlePanelScaleRatio =
        (this.params.middlePanel.scale.y / this.params.middlePanel.originalScale.y) * middlePanelScaleCoeff
    ;
    this.params.leftPanel.scale.y = middlePanelScaleRatio * this.params.topPanel.originalScale.y;
    this.params.rightPanel.scale.y = middlePanelScaleRatio * this.params.bottomPanel.originalScale.y;

    // Resize back panels
    this.params.backMiddle.scale.y = this.params.middlePanel.scale.y;
    this.params.backTop.position.z = this.params.topPanel.position.z;
    this.params.backBottom.position.z = this.params.bottomPanel.position.z;
    this.params.backTopLeft.position.z = this.params.topLeftPanel.position.z;
    this.params.backBottomLeft.position.z = this.params.bottomLeftPanel.position.z;
    this.params.backTopRight.position.z = this.params.topRightPanel.position.z;
    this.params.backBottomRight.position.z = this.params.bottomRightPanel.position.z;
    this.params.backLeft.scale.y = this.params.leftPanel.scale.y;
    this.params.backRight.scale.y = this.params.rightPanel.scale.y;

    // Resize back brown panels
    this.params.backMiddleBrown.scale.y = this.params.middlePanel.scale.y;
    this.params.backTopBrown.position.z = this.params.topPanel.position.z;
    this.params.backBottomBrown.position.z = this.params.bottomPanel.position.z;
    this.params.backTopLeftBrown.position.z = this.params.topLeftPanel.position.z;
    this.params.backBottomLeftBrown.position.z = this.params.bottomLeftPanel.position.z;
    this.params.backTopRightBrown.position.z = this.params.topRightPanel.position.z;
    this.params.backBottomRightBrown.position.z = this.params.bottomRightPanel.position.z;
    this.params.backLeftBrown.scale.y = this.params.leftPanel.scale.y;
    this.params.backRightBrown.scale.y = this.params.rightPanel.scale.y;

    // Texture
    this.repositionTextures();
};

Panoteq3dViewer.prototype.createGui = function () {
    if (this.guiAlreadyCreated) {
        return;
    }
    this.guiAlreadyCreated = true;

    var thisRef = this;

    var gui = new dat.GUI();

    gui.addColor(this.params, 'ralColor').onChange(function () {
        this.debugLog('RAL Color: ' + thisRef.params.ralColor);

        var newColor = new THREE.Color(parseInt('0x' + thisRef.params.ralColor.substring(1)));

        var mat = thisRef.createColoredMaterial(newColor);
        thisRef.params.middlePanel.material = mat;
        thisRef.params.bottomPanel.material = mat;
        thisRef.params.topPanel.material = mat;
        thisRef.params.leftPanel.material = mat;
        thisRef.params.rightPanel.material = mat;
        thisRef.params.topRightPanel.material = mat;
        thisRef.params.topLeftPanel.material = mat;
        thisRef.params.bottomLeftPanel.material = mat;
        thisRef.params.bottomRightPanel.material = mat;

        thisRef.render();
    });

    gui.add(this.params, 'shininess').min(0.0).max(120.0).onChange(function () {
        thisRef.params.middlePanel.material.shininess = thisRef.params.shininess;
        thisRef.params.bottomPanel.material.shininess = thisRef.params.shininess;
        thisRef.params.topPanel.material.shininess = thisRef.params.shininess;
        thisRef.params.leftPanel.material.shininess = thisRef.params.shininess;
        thisRef.params.rightPanel.material.shininess = thisRef.params.shininess;
        thisRef.params.topRightPanel.material.shininess = thisRef.params.shininess;
        thisRef.params.topLeftPanel.material.shininess = thisRef.params.shininess;
        thisRef.params.bottomLeftPanel.material.shininess = thisRef.params.shininess;
        thisRef.params.bottomRightPanel.material.shininess = thisRef.params.shininess;

        thisRef.render();
    });

//    gui.add(this.params, 'lightsIntensityFactor').min(0.0).max(150).onChange(function () {
//        thisRef.adjustLightIntensities(thisRef, this.params.lightsIntensityFactor);
//        thisRef.render();
//    });

//                gui.add(this.params.middlePanel.material, 'shininess').min(0.0).max(50.0).onChange(function () {
//                    thisRef.render();
//                });

    gui.add(this.params, 'desiredWidth').min(1).max(10).onChange(function () {
        thisRef.scaleModelHorizontally();
        //thisRef.autoPlaceCamera();
        thisRef.render();
    });

    gui.add(this.params, 'desiredHeight').min(1).max(10).onChange(function () {
        thisRef.scaleModelVertically();
        //thisRef.autoPlaceCamera();
        thisRef.render();
    });

//                gui.add(this.params.middlePanel.material, 'wireframe').onChange(function () {
//                    thisRef.render();
//                });
};

Panoteq3dViewer.prototype.adjustLightIntensities = function (thisRef, factor) {
    var f = factor / 100.0;
    this.debugLog('Adjusting light intensities by factor: ' + f);
    this.debugLog(thisRef.scene);
    thisRef.params.frontLight.intensity = thisRef.params.frontLight.originalIntensity * f;
    thisRef.params.bottomRightLight.intensity = thisRef.params.bottomRightLight.originalIntensity * f;
    thisRef.params.leftEdgeLight.intensity = thisRef.params.leftEdgeLight.originalIntensity * f;
    thisRef.params.rightEdgeLight.intensity = thisRef.params.rightEdgeLight.originalIntensity * f;
    thisRef.params.bottomEdgeLight.intensity = thisRef.params.bottomEdgeLight.originalIntensity * f;
};

Panoteq3dViewer.prototype.createBackdrop = function () {
    // ground
//    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({precision: 'mediump', color: 0x999999, depthWrite: false}));
//    mesh.rotation.x = -Math.PI / 2;
//    mesh.receiveShadow = true;
//    this.scene.add(mesh);
//    var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
//    grid.material.opacity = 0.2;
//    grid.material.transparent = true;
//    this.scene.add(grid);

//    var geometry = new THREE.BoxGeometry(1, 1, 1);
//    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
//    var cube = new THREE.Mesh(geometry, material);
//    this.scene.add(cube);
};

Panoteq3dViewer.prototype.destroyObject = function (obj) {
    if (obj.name == 'backTopRightDuplicate') {
        this.debugLog('IN backTopRightDuplicate');
    }

    // Process children
    var objectsToRemove = [];

    for (var i = 0; i < obj.children.length; i++) {
        if (obj.children[i].type !== "AmbientLight"
            && obj.children[i].type !== "DirectionalLight"
            && obj.children[i].type !== "PointLight"
            && obj.children[i].type !== "HemisphereLight"
            && obj.children[i].type !== "SpotLight"
        ) {
            this.debugLog('Destroying: ' + obj.children[i].name);
            this.destroyObject(obj.children[i]);
            objectsToRemove.push(obj.children[i]);
        }
    }

    for (var i = 0; i < objectsToRemove.length; i++) {
        obj.remove(objectsToRemove[i]);
    }

    this.debugLog(obj.name + ' - num children: ' + obj.children.length);

    if (obj.geometry !== undefined)
        obj.geometry.dispose();
    if (obj.material !== undefined)
        obj.material.dispose();
    if (obj.texture !== undefined)
        obj.texture.dispose();
};

Panoteq3dViewer.prototype.loadDoorModel = function (productId, attributeIdOrRal, isRALColor, inverted, holesOffsetsY, rightSide, dimensions, horizontalTexture) {
    this.hideModelWhileLoading();

    if (!isRALColor) {
        var textureFileName = attributeIdOrRal;
        attributeIdOrRal = attributeIdOrRal.split('/').splice(-1)[0];
        console.log('Select attributeIdOrRal texture params: ' + attributeIdOrRal);

        var textureHasHorizontal = this.texturesHasHorizontal[attributeIdOrRal];

        if (horizontalTexture && textureHasHorizontal) {
            textureFileName = textureFileName.substring(0, textureFileName.length - 4) + 'Horiz.jpg';
        }

        var textureShininess = this.texturesShininess[attributeIdOrRal];
        var lightIntensity = this.lightsIntensitiesFactors[attributeIdOrRal];
        this.textureFileName = textureFileName;
        this.textureShininess = textureShininess;
        this.lightIntensity = lightIntensity;
    } else {
        this.textureFileName = null;
        this.textureShininess = 10;
        this.lightIntensity = 10;
    }

    var modelFile = this.modelsFiles[productId];
    this.modelFile = modelFile;

    var thisRef = this;

    // Destroy previous scene
    this.destroyObject(thisRef.scene);

    var modelPath = inverted ? this.modelFile.path_inverted : this.modelFile.path;
    this.debugLog('Loading model ' + modelPath);

    this.loader.load(this.modelsDirectory + modelPath, function (object) {
        thisRef.model = object;

        thisRef.debugLog(thisRef.model);

        thisRef.initParams(thisRef.model, thisRef.modelFile.type);

        // Add finished model to scene
        thisRef.scene.add(thisRef.model);
        thisRef.model.rotation.x = Math.PI / 2;

        //thisRef.animate();

        // Retexture FBX model

        if (!isRALColor) {
            thisRef.numMaterialsLoaded = 0;

            thisRef.loadAndCreateTexturedMaterialAsync(thisRef.params.middlePanel, thisRef.texturesDirectory + thisRef.textureFileName, thisRef.textureShininess);
            thisRef.loadAndCreateTexturedMaterialAsync(thisRef.params.topLeftPanel, thisRef.texturesDirectory + thisRef.textureFileName, thisRef.textureShininess);
            thisRef.loadAndCreateTexturedMaterialAsync(thisRef.params.topPanel, thisRef.texturesDirectory + thisRef.textureFileName, thisRef.textureShininess);
            thisRef.loadAndCreateTexturedMaterialAsync(thisRef.params.topRightPanel, thisRef.texturesDirectory + thisRef.textureFileName, thisRef.textureShininess);
            thisRef.loadAndCreateTexturedMaterialAsync(thisRef.params.rightPanel, thisRef.texturesDirectory + thisRef.textureFileName, thisRef.textureShininess);
            thisRef.loadAndCreateTexturedMaterialAsync(thisRef.params.bottomRightPanel, thisRef.texturesDirectory + thisRef.textureFileName, thisRef.textureShininess);
            thisRef.loadAndCreateTexturedMaterialAsync(thisRef.params.bottomPanel, thisRef.texturesDirectory + thisRef.textureFileName, thisRef.textureShininess);
            thisRef.loadAndCreateTexturedMaterialAsync(thisRef.params.bottomLeftPanel, thisRef.texturesDirectory + thisRef.textureFileName, thisRef.textureShininess);
            thisRef.loadAndCreateTexturedMaterialAsync(thisRef.params.leftPanel, thisRef.texturesDirectory + thisRef.textureFileName, thisRef.textureShininess);
        } else {
            thisRef.debugLog('RAL Color: ' + attributeIdOrRal);

            thisRef.showModelAfterLoading();

            var newColor = new THREE.Color(parseInt('0x' + attributeIdOrRal.substring(1)));
            var mat = thisRef.createColoredMaterial(newColor);
            thisRef.params.middlePanel.material = mat;
            thisRef.params.bottomPanel.material = mat;
            thisRef.params.topPanel.material = mat;
            thisRef.params.leftPanel.material = mat;
            thisRef.params.rightPanel.material = mat;
            thisRef.params.topRightPanel.material = mat;
            thisRef.params.topLeftPanel.material = mat;
            thisRef.params.bottomLeftPanel.material = mat;
            thisRef.params.bottomRightPanel.material = mat;
        }

        // Retexture back of model
        var backMaterial = new THREE.MeshPhongMaterial({
            precision: 'mediump',
            color: 0xffffff,
            emissive: 0xcccccc,
            shininess: 0.0,
            aoMapIntensity: 0,
            wireframe: false
        });
//        var backMaterial2 = new THREE.MeshPhongMaterial({
//            precision: 'mediump',
//            color: 0xff0000,
//            emissive: 0xcccccc,
//            shininess: 0.0,
//            aoMapIntensity: 0,
////            wireframe: true
//        });
//        var backMaterial3 = new THREE.MeshPhongMaterial({
//        precision: 'mediump',
//            color: 0x0000ff,
//            emissive: 0xcccccc,
//            shininess: 0.0,
//            aoMapIntensity: 0,
////            wireframe: true
//        });

        thisRef.params.backMiddle.material = backMaterial;
        thisRef.params.backTopLeft.material = backMaterial;
        thisRef.params.backTop.material = backMaterial;
        thisRef.params.backRight.material = backMaterial;
        thisRef.params.backTopRight.material = backMaterial;
        thisRef.params.backBottomRight.material = backMaterial;
        thisRef.params.backBottom.material = backMaterial;
        thisRef.params.backLeft.material = backMaterial;
        thisRef.params.backBottomLeft.material = backMaterial;

        // Create back brown panel
        thisRef.createBackBrownPanel();

        // Disable lamps
        thisRef.scene.traverse(function (child) {
            switch (child.name) {
                case 'middleCube':
                case 'topCube':
                case 'bottomCube':
                case 'topLeftCube':
                case 'topRightCube':
                case 'bottomLeftCube':
                case 'bottomRightCube':
                case 'rightCube':
                case 'leftCube':
                case 'backTopLeftPanel':
                case 'backTopPanel':
                case 'backTopRightPanel':
                case 'backRightPanel':
                case 'backBottomRightPanel':
                case 'backBottomPanel':
                case 'bottomBackPanel':
                case 'backBottomLeftPanel':
                case 'backLeftPanel':
                case 'backPanel':
                    thisRef.debugLog('Removing object: ' + child.name);
                    thisRef.scene.remove(child);
                    child.position.x = 10000;
                    break;
                case 'Lamp':
                case 'Lamp001':
                case 'Lamp002':
                    thisRef.debugLog('Removing object: ' + child.name);
                    child.intensity = 0;
                    break;
                default:
            }
        });

        // Adjust lights
        thisRef.adjustLightIntensities(thisRef, thisRef.lightIntensity);
        thisRef.render();

        // Redimension model
        thisRef.params.desiredWidth = dimensions[0];
        thisRef.params.desiredHeight = dimensions[1];

        thisRef.scaleModelHorizontally();
        thisRef.scaleModelVertically();

        // Make holes
        thisRef.drillHoles(holesOffsetsY, rightSide);

        // Auto zoom
        thisRef.autoPlaceCamera();

        // Gui
        // thisRef.createGui();

        // Render once
        thisRef.render();
    });
};

Panoteq3dViewer.prototype.createBackBrownPanel = function () {
    var thisRef = this;

    var backMaterial = new THREE.MeshPhongMaterial({
        precision: 'mediump',
        color: 0x333333,
        emissive: 0x333333,
        shininess: 0.0,
        aoMapIntensity: 0
    });

    // Create back brown panel
    thisRef.scene.traverse(function (child) {
        switch (child.name) {
            case 'backMiddle':
            case 'backTopLeft':
            case 'backTop':
            case 'backTopRight':
            case 'backRight':
            case 'backBottomRight':
            case 'backBottom':
            case 'backBottomLeft':
            case 'backLeft':
                var clone = child.clone();
                clone.material = backMaterial;
                clone.name = child.name + 'Brown';
//                clone.position.y += 0.001;
                child.position.y -= 0.001;
                thisRef.model.add(clone);

                eval('thisRef.params.' + child.name + 'Brown = clone;');
                break;
            default:
        }
    });
};

Panoteq3dViewer.prototype.createScene = function () {
    var thisRef = this;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xfafaf8);
    //this.scene.background = new THREE.Color(0xa0a0a0);

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.set(0, 0, 12 * (this.backSideView ? 1 : 1));

    // Orbit this.controls
    this.controls = new THREE.OrbitControls(this.camera, this.container);
    this.controls.target.set(0, 0, 0);
    this.controls.addEventListener('change', function () {
        thisRef.render();
    });

    // Light
    this.params.ambientLight = new THREE.AmbientLight(0x333333);
    this.params.ambientLight.name = 'Ambient light';
    this.scene.add(this.params.ambientLight);

    var lightIntensityFactory = 0.68;
//    var lightIntensityFactory = 1.0;

    // Front - top left
    this.params.frontLight = new THREE.PointLight(0xffffff, 1 * lightIntensityFactory, 0, 1);
    this.params.frontLight.originalIntensity = this.params.frontLight.intensity;
    this.params.frontLight.position.set(-200, 600, 500);
    this.params.frontLight.name = 'Front top left light';
    this.scene.add(this.params.frontLight);

    // Front - bottom right
    this.params.bottomRightLight = new THREE.PointLight(0xffffff, 0.5 * lightIntensityFactory, 0, 1);
    this.params.bottomRightLight.position.set(200, 50, 500);
    this.params.bottomRightLight.originalIntensity = this.params.bottomRightLight.intensity;
    this.params.bottomRightLight.name = 'Front bottom right light';
    this.scene.add(this.params.bottomRightLight);

    // Left edge light
    this.params.leftEdgeLight = new THREE.PointLight(0xffffff, 0.5 * lightIntensityFactory, 0, 1);
    this.params.leftEdgeLight.position.set(-500, 0, 0);
    this.params.leftEdgeLight.originalIntensity = this.params.leftEdgeLight.intensity;
    this.params.leftEdgeLight.name = 'Left edge light';
    this.scene.add(this.params.leftEdgeLight);

    // Right edge light
    this.params.rightEdgeLight = new THREE.PointLight(0xffffff, 0.5 * lightIntensityFactory, 0, 1);
    this.params.rightEdgeLight.position.set(500, 0, 0);
    this.params.rightEdgeLight.originalIntensity = this.params.rightEdgeLight.intensity;
    this.params.rightEdgeLight.name = 'Right edge light';
    this.scene.add(this.params.rightEdgeLight);

    // Bottom edge light
    this.params.bottomEdgeLight = new THREE.PointLight(0xffffff, 0.5 * lightIntensityFactory, 0, 1);
    this.params.bottomEdgeLight.position.set(0, -500, 50);
    this.params.bottomEdgeLight.originalIntensity = this.params.bottomEdgeLight.intensity;
    this.params.bottomEdgeLight.name = 'Bottom edge light';
    this.scene.add(this.params.bottomEdgeLight);

    // Back
    this.params.backLight = new THREE.PointLight(0xffffff, 0.5 * lightIntensityFactory, 0, 1);
    this.params.backLight.position.set(0, 0, -500);
    this.params.backLight.originalIntensity = this.params.backLight.intensity;
    this.params.backLight.name = 'Back light';
    this.scene.add(this.params.backLight);

    this.createBackdrop();
};


Panoteq3dViewer.prototype.initParams = function () {
    var thisRef = this;

    var numberOfFoundPanels = 0;

    this.model.traverse(function (child) {
        if (child.isMesh) {
            switch (child.name) {
                case 'middlePanel':
                case 'middlePanel2':
                    thisRef.debugLog('Found milieu');
                    ++numberOfFoundPanels;
                    thisRef.params.middlePanel = child;
                    break;
                case 'topPanel':
                case 'topPanel2':
                    thisRef.debugLog('Found haut');
                    ++numberOfFoundPanels;
                    thisRef.params.topPanel = child;
                    break;
                case 'bottomPanel':
                case 'bottomPanel2':
                    thisRef.debugLog('Found bas');
                    ++numberOfFoundPanels;
                    thisRef.params.bottomPanel = child;
                    break;
                case 'rightPanel':
                case 'rightPanel2':
                case 'RightPanel':
                    thisRef.debugLog('Found droite');
                    ++numberOfFoundPanels;
                    thisRef.params.rightPanel = child;
                    break;
                case 'leftPanel':
                case 'LeftPanel':
                case 'leftPanel2':
                    thisRef.debugLog('Found left');
                    ++numberOfFoundPanels;
                    thisRef.params.leftPanel = child;
                    break;
                case 'topLeftPanel':
                case 'topLeftPanel2':
                    thisRef.debugLog('Found top left');
                    ++numberOfFoundPanels;
                    thisRef.params.topLeftPanel = child;
                    break;
                case 'topRightPanel':
                case 'topRightPanel2':
                    thisRef.debugLog('Found top right');
                    ++numberOfFoundPanels;
                    thisRef.params.topRightPanel = child;
                    break;
                case 'bottomLeftPanel':
                case 'bottomLeftPanel2':
                    thisRef.debugLog('Found bottom left');
                    ++numberOfFoundPanels;
                    thisRef.params.bottomLeftPanel = child;
                    break;
                case 'bottomRightPanel':
                case 'bottomRightPanel2':
                    thisRef.debugLog('Found bottom right');
                    ++numberOfFoundPanels;
                    thisRef.params.bottomRightPanel = child;
                    break;
                case 'backMiddle':
                case 'backPanel':
                    thisRef.debugLog('Found back middle: ' + child.name);
                    ++numberOfFoundPanels;
                    thisRef.params.backMiddle = child;
                    break;
                case 'backTopLeft':
                    thisRef.debugLog('Found back top left');
                    ++numberOfFoundPanels;
                    thisRef.params.backTopLeft = child;
                    break;
                case 'backLeft':
                    thisRef.debugLog('Found back left');
                    ++numberOfFoundPanels;
                    thisRef.params.backLeft = child;
                    break;
                case 'backTopRight':
                    thisRef.debugLog('Found back top right');
                    ++numberOfFoundPanels;
                    thisRef.params.backTopRight = child;
                    break;
                case 'backTop':
                    thisRef.debugLog('Found back top');
                    ++numberOfFoundPanels;
                    thisRef.params.backTop = child;
                    break;
                case 'backRight':
                    thisRef.debugLog('Found back right');
                    ++numberOfFoundPanels;
                    thisRef.params.backRight = child;
                    break;
                case 'backBottomRight':
                    thisRef.debugLog('Found back bottom right');
                    ++numberOfFoundPanels;
                    thisRef.params.backBottomRight = child;
                    break;
                case 'backBottom':
                    thisRef.debugLog('Found back bottom');
                    ++numberOfFoundPanels;
                    thisRef.params.backBottom = child;
                    break;
                case 'backBottomLeft':
                    thisRef.debugLog('Found back bottom left');
                    ++numberOfFoundPanels;
                    thisRef.params.backBottomLeft = child;
                    break;
                default:
                    thisRef.debugLog('Unidentified: ' + child.name);
            }
        }
    });

    this.debugLog('Number of found panels: ' + numberOfFoundPanels);

    if (numberOfFoundPanels !== 18) {
        console.error('Invalid number of panels');
    }

    var uvs = this.params.middlePanel.geometry.attributes.uv.array;

    var maxDistX = 0;
    var maxDistY = 0;
    for (var i = 0; i < uvs.length; i += 6) {
        var val;
        val = Math.abs(uvs[i + 0] - uvs[i + 2]);
        maxDistX = val > maxDistX ? val : maxDistX;
        val = Math.abs(uvs[i + 2] - uvs[i + 4]);
        maxDistX = val > maxDistX ? val : maxDistX;
        val = Math.abs(uvs[i + 4] - uvs[i + 0]);
        maxDistX = val > maxDistX ? val : maxDistX;
        val = Math.abs(uvs[i + 1] - uvs[i + 3]);
        maxDistY = val > maxDistY ? val : maxDistY;
        val = Math.abs(uvs[i + 3] - uvs[i + 5]);
        maxDistY = val > maxDistY ? val : maxDistY;
        val = Math.abs(uvs[i + 5] - uvs[i + 0]);
        maxDistY = val > maxDistY ? val : maxDistY;
    }
    this.debugLog('max UV distance X: ' + maxDistX);
    this.debugLog('max UV distance Y: ' + maxDistY);

    var maxX = 0;
    var minX = 1000;
    var maxY = 0;
    var minY = 1000;
    for (var i = 0; i < uvs.length; i += 2) {
        if (uvs[i + 0] != 0) {
            maxX = uvs[i + 0] > maxX ? uvs[i + 0] : maxX;
            minX = uvs[i + 0] < minX ? uvs[i + 0] : minX;
        }
        if (uvs[i + 1] != 0) {
            maxY = uvs[i + 1] > maxY ? uvs[i + 1] : maxY;
            minY = uvs[i + 1] < minY ? uvs[i + 1] : minY;
        }
    }
    this.debugLog('max UV X: ' + maxX + ' - min UV X: ' + minX);
    this.debugLog('max UV Y: ' + maxY + ' - min UV Y: ' + minY);

    var uvs = this.params.rightPanel.geometry.attributes.uv.array;

    var maxDistX = 0;
    var maxDistY = 0;
    for (var i = 0; i < uvs.length; i += 6) {
        var val;
        val = Math.abs(uvs[i + 0] - uvs[i + 2]);
        maxDistX = val > maxDistX ? val : maxDistX;
        val = Math.abs(uvs[i + 2] - uvs[i + 4]);
        maxDistX = val > maxDistX ? val : maxDistX;
        val = Math.abs(uvs[i + 4] - uvs[i + 0]);
        maxDistX = val > maxDistX ? val : maxDistX;
        val = Math.abs(uvs[i + 1] - uvs[i + 3]);
        maxDistY = val > maxDistY ? val : maxDistY;
        val = Math.abs(uvs[i + 3] - uvs[i + 5]);
        maxDistY = val > maxDistY ? val : maxDistY;
        val = Math.abs(uvs[i + 5] - uvs[i + 0]);
        maxDistY = val > maxDistY ? val : maxDistY;
    }
    this.debugLog('max UV distance X: ' + maxDistX);
    this.debugLog('max UV distance Y: ' + maxDistY);

    var maxX = 0;
    var minX = 1000;
    var maxY = 0;
    var minY = 1000;
    for (var i = 0; i < uvs.length; i += 2) {
        if (uvs[i + 0] != 0) {
            maxX = uvs[i + 0] > maxX ? uvs[i + 0] : maxX;
            minX = uvs[i + 0] < minX ? uvs[i + 0] : minX;
        }
        if (uvs[i + 1] != 0) {
            maxY = uvs[i + 1] > maxY ? uvs[i + 1] : maxY;
            minY = uvs[i + 1] < minY ? uvs[i + 1] : minY;
        }
    }
    this.debugLog('max UV X: ' + maxX + ' - min UV X: ' + minX);
    this.debugLog('max UV Y: ' + maxY + ' - min UV Y: ' + minY);

    this.params.middlePanel.originalScale = this.params.middlePanel.scale.clone();
    this.params.middlePanel.originalPosition = this.params.middlePanel.position.clone();
    this.params.middlePanel.geometry.computeBoundingBox();
    this.params.topPanel.originalScale = this.params.topPanel.scale.clone();
    this.params.topPanel.originalPosition = this.params.topPanel.position.clone();
    this.params.topPanel.geometry.computeBoundingBox();
    this.params.bottomPanel.originalScale = this.params.bottomPanel.scale.clone();
    this.params.bottomPanel.originalPosition = this.params.bottomPanel.position.clone();
    this.params.bottomPanel.geometry.computeBoundingBox();
    this.params.rightPanel.originalScale = this.params.rightPanel.scale.clone();
    this.params.rightPanel.originalPosition = this.params.rightPanel.position.clone();
    this.params.rightPanel.geometry.computeBoundingBox();
    this.params.leftPanel.originalScale = this.params.leftPanel.scale.clone();
    this.params.leftPanel.originalPosition = this.params.leftPanel.position.clone();
    this.params.leftPanel.geometry.computeBoundingBox();
//                if (this.params.backPanel != null) {
//                    this.params.backPanel.originalScale = this.params.backPanel.scale.clone();
//                }
    var middlePanelWidth = this.params.middlePanel.geometry.boundingBox.max.x - this.params.middlePanel.geometry.boundingBox.min.x;
    middlePanelWidth *= this.params.middlePanel.originalScale.x;
    var middlePanelHeight = this.params.middlePanel.geometry.boundingBox.max.y - this.params.middlePanel.geometry.boundingBox.min.y;
    middlePanelHeight *= this.params.middlePanel.originalScale.y;
    var topPanelHeight = this.params.topPanel.geometry.boundingBox.max.y - this.params.topPanel.geometry.boundingBox.min.y;
    topPanelHeight *= this.params.topPanel.originalScale.y;
    var bottomPanelHeight = this.params.bottomPanel.geometry.boundingBox.max.y - this.params.bottomPanel.geometry.boundingBox.min.y;
    bottomPanelHeight *= this.params.bottomPanel.originalScale.y;
    var rightPanelWidth = this.params.rightPanel.geometry.boundingBox.max.x - this.params.rightPanel.geometry.boundingBox.min.x;
    rightPanelWidth *= this.params.rightPanel.originalScale.x;
    var leftPanelWidth = this.params.leftPanel.geometry.boundingBox.max.x - this.params.leftPanel.geometry.boundingBox.min.x;
    leftPanelWidth *= this.params.leftPanel.originalScale.x;
//    var leftPanelHeight = this.params.leftPanel.geometry.boundingBox.max.y - this.params.leftPanel.geometry.boundingBox.min.y;
//    leftPanelHeight *= this.params.leftPanel.originalScale.y;

    var totalHeight = middlePanelHeight + topPanelHeight + bottomPanelHeight;
    var totalWidth = middlePanelWidth + leftPanelWidth + rightPanelWidth;

    this.params.middlePanel.origWidth = middlePanelWidth;
    this.params.middlePanel.origHeight = middlePanelHeight;
    this.params.topPanel.origHeight = topPanelHeight;
    this.params.bottomPanel.origHeight = bottomPanelHeight;
    this.params.leftPanel.origWidth = leftPanelWidth;
//    this.params.leftPanel.origHeight = leftPanelHeight;
    this.params.rightPanel.origWidth = rightPanelWidth;

    this.params.ralColor = '#ffffff';
    this.params.desiredHeight = totalHeight;
    this.params.desiredWidth = totalWidth;

    this.debugLog("middlePanelWidth: " + middlePanelWidth);
    this.debugLog("middlePanelHeight: " + middlePanelHeight);
    this.debugLog("topPanelHeight: " + topPanelHeight);
    this.debugLog("bottomPanelHeight: " + bottomPanelHeight);
    this.debugLog("leftPanelWidth: " + leftPanelWidth);
    this.debugLog("rightPanelWidth: " + rightPanelWidth);
    this.debugLog('total height: ' + totalHeight);
    this.debugLog('total width: ' + totalWidth);
};

Panoteq3dViewer.prototype.duplicateBackPanel = function (panel) {
    this.debugLog('Duplicate');
//    if (panel.geometry.boundingBox == null || panel.geometry.boundingBox == undefined) {
    panel.geometry.computeBoundingBox();
//    }

    var box = panel.geometry.boundingBox;
    var box = new THREE.Box3();
    box.setFromObject(panel);

    var panelWidth = (box.max.x - box.min.x) * 2;
    var panelHeight = (box.max.y - box.min.y) * 2;
    var panelDepth = (box.max.z - box.min.z) * 2;
//    var panelWidth = this.params.leftPanel.origWidth * this.params.leftPanel.scale.x * 2;
//    var panelHeight = this.params.middlePanel.origWidth * this.params.middlePanel.scale.y * 4;
//    var panelDepth = 0.5;
    var panelX = (box.max.x + box.min.x) / 2;
    var panelY = (box.max.y + box.min.y) / 2;
    var panelZ = (box.max.z + box.min.z) / 2;

//    this.debugLog(panelWidth);
//    this.debugLog(panelHeight);
//    this.debugLog(panelDepth);

    var middle = new THREE.Vector3();
    var center = panel.geometry.boundingBox.getCenter();
    panel.localToWorld(center);

    var geometry = new THREE.BoxGeometry(panelWidth / 2, panelHeight / 2, panelDepth / 2);
    var cube = new THREE.Mesh(geometry, this.backPanelsMaterial);

    cube.position.x = center.x;
    cube.position.y = center.y;
    cube.position.z = center.z;
//    cube.position.x = panelX;
//    cube.position.y = panelY;
//    cube.position.z = panelZ;
//    cube.position.x = this.params.leftPanel.position.x;
//    cube.position.y = this.params.leftPanel.position.y;
//    cube.position.z = this.params.leftPanel.position.z;

    cube.name = panel.name + 'Duplicate';

    this.scene.add(cube);

    this.debugLog('Duplicate END');

    return cube;
};

Panoteq3dViewer.prototype.drillHoles = function (offsetsY, rightSide) {

    // Fixed params
    var holeRadius = 0.35 * 0.5; // 35mm de diametre
    var holeRadius2 = 0.08 * 0.5; // 8mm de diametre

    // Calculate model dimensions
    var rightEdgeX = this.params.middlePanel.origWidth * this.params.middlePanel.scale.x
        + this.params.leftPanel.origWidth * this.params.leftPanel.scale.x
        + this.params.rightPanel.origWidth * this.params.rightPanel.scale.x;
    var rightEdgeY = this.params.middlePanel.origHeight * this.params.middlePanel.scale.y
        + this.params.topPanel.origHeight * this.params.topPanel.scale.y
        + this.params.bottomPanel.origHeight * this.params.bottomPanel.scale.y;

    var baseOffsetX = 0;
    var baseOffsetY = 0;

    if (!rightSide) {
        baseOffsetX = -holeRadius * 1 - 0.05 // a 5mm du bord
    } else {
        baseOffsetX = -rightEdgeX + holeRadius * 1 + 0.05; // a 5mm du bord
    }

//    var offsetsY = [
//        0.8,     // 80mm a partir du haut et du bas,
//        5.49 - 0.8
//    ];

    // Place sphere
    var holesToDrill = [];


    for (var i = 0; i < offsetsY.length; i++) {
        var offsetX = baseOffsetX;
//        var offsetX2 = baseOffsetX2;
        var offsetY = baseOffsetY + offsetsY[i];

        var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(holeRadius, holeRadius, 0.5, 20, 10));
        var cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(holeRadius2, holeRadius2, 0.5, 20, 1));
        var cylinder3 = new THREE.Mesh(new THREE.CylinderGeometry(holeRadius2, holeRadius2, 0.5, 20, 1));

        cylinder.position.x = rightEdgeX * 0.5 + offsetX;
        cylinder.position.y = rightEdgeY * -0.5 + offsetY;
        cylinder.rotation.x = Math.PI / 2;
        //this.scene.add(cylinder);

        cylinder2.position.z = this.params.backMiddle.position.y;
        cylinder2.position.x = cylinder.position.x + 0.095 * (rightSide ? 1 : -1); // 9.5mm du centre du percage principal
        cylinder2.position.y = cylinder.position.y - 0.225; // 22.5mm du centre
        cylinder2.rotation.x = Math.PI / 2;

        cylinder3.position.z = this.params.backMiddle.position.y;
        cylinder3.position.x = cylinder.position.x + 0.095 * (rightSide ? 1 : -1); // 9.5mm du centre du percage principal
        cylinder3.position.y = cylinder.position.y + 0.225; // 22.5mm du centre
        cylinder3.rotation.x = Math.PI / 2;

        holesToDrill.push(cylinder);
        holesToDrill.push(cylinder2);
        holesToDrill.push(cylinder3);
    }

    // Drill holes
    if (!rightSide) {
        // Duplicate panels
        var newPanelRight = this.duplicateBackPanel(this.params.backRight);
        var newPanelTopRight = this.duplicateBackPanel(this.params.backTopRight);
        var newPanelBottomRight = this.duplicateBackPanel(this.params.backBottomRight);

        // Send originals to heaven
        this.params.backRight.position.x -= 10000.0;
        this.params.backTopRight.position.x -= 10000.0;
        this.params.backBottomRight.position.x -= 10000.0;

//        this.params.backRight = newPanelRight;
//        this.params.backTopRight = newPanelTopRight;
//        this.params.backBottomRight = newPanelBottomRight;

        // Drill
        this.drill(holesToDrill, newPanelRight);
        this.drill(holesToDrill, newPanelTopRight);
        this.drill(holesToDrill, newPanelBottomRight);
    } else {
        // Duplicate panels
        var newPanelLeft = this.duplicateBackPanel(this.params.backLeft);
        var newPanelTopLeft = this.duplicateBackPanel(this.params.backTopLeft);
        var newPanelBottomLeft = this.duplicateBackPanel(this.params.backBottomLeft);

        // Send originals to heaven
        this.params.backLeft.position.x -= 10000.0;
        this.params.backTopLeft.position.x -= 10000.0;
        this.params.backBottomLeft.position.x -= 10000.0;

//        this.params.backLeft = newPanelLeft;
//        this.params.backTopLeft = newPanelTopLeft;
//        this.params.backBottomLeft = newPanelBottomLeft;

        // Move holes before drilling
        this.drill(holesToDrill, newPanelLeft);
        this.drill(holesToDrill, newPanelTopLeft);
        this.drill(holesToDrill, newPanelBottomLeft);
    }
};

Panoteq3dViewer.prototype.drill = function (holesToDrill, panel) {
    // Move holes before drilling
    for (var i = 0; i < holesToDrill.length; i++) {
        holesToDrill[i].position.x -= panel.position.x;
        holesToDrill[i].position.y -= panel.position.y;
    }
    // Drill
    panel.geometry = this.substractGeometry(new THREE.BufferGeometry().fromGeometry(panel.geometry), holesToDrill);

    // Restore holes positions
    for (var i = 0; i < holesToDrill.length; i++) {
        holesToDrill[i].position.x += panel.position.x;
        holesToDrill[i].position.y += panel.position.y;
    }
};

Panoteq3dViewer.prototype.substractGeometry = function (mainGeom, substracters) {
    var bsp = new ThreeBSP(new THREE.Geometry().fromBufferGeometry(mainGeom));
    var toEval = 'bsp';

    for (var i = 0; i < substracters.length; i++) {
        toEval += '.subtract(new ThreeBSP(substracters[' + i + ']))';
    }

    toEval += '.toGeometry()';

    return eval(toEval);
};

Panoteq3dViewer.prototype.createColoredMaterial = function (colour) {
    return new THREE.MeshPhongMaterial({
        precision: 'mediump',
        color: 0x000000,
        emissive: colour,
//        shininess: 3.0,
//        specular: 0xffffff,
        aoMapIntensity: 0
    });
};

Panoteq3dViewer.prototype.loadAndCreateTexturedMaterialAsync = function (panel, textureFileName, textureShininess) {
    var thisRef = this;
    new THREE.TextureLoader().load(textureFileName,
        function (texture) {
            thisRef.numMaterialsLoaded++;
            if (thisRef.numMaterialsLoaded == 9) {
                thisRef.showModelAfterLoading();
            }

            panel.material = thisRef.createTexturedMaterial(texture, textureShininess);
            thisRef.render();
        },
        undefined, // onProgress callback currently not supported
        function (err) {
            console.error('An error happened.');
        }
    );
};

Panoteq3dViewer.prototype.createTexturedMaterial = function (texture, textureShininess) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

//                var newMaterial = new THREE.MeshNormalMaterial({
    var newMaterial = new THREE.MeshPhongMaterial({
        precision: 'mediump',
        map: texture,
        color: 0xffffff,
//        color: 0x000000,
//                    wireframe: true,
        //                                                                        emissive: 0x663300,
        //                                    depthWrite: false,
        shininess: textureShininess,
//                    specular: 0xffffff,
        aoMapIntensity: 0
    });

//                newMaterial.map.repeat.x = THREE.MirroredRepeatWrapping;
//                newMaterial.map.repeat.y = THREE.MirroredRepeatWrapping;

//                newMaterial.shading = THREE.FlatShading;

//                newMaterial.map.origOffset = {};
//                newMaterial.map.origOffset.x = newMaterial.map.offset.x;
//                newMaterial.map.origOffset.y = newMaterial.map.offset.y;

    return newMaterial;
};

Panoteq3dViewer.prototype.init = function (element, productId, attributeId, inverted, holesOffsetsY, rightSide, backSideView, dimensions, horizontalTexture, isRal) {
    var thisRef = this;

    this.backSideView = backSideView;

    // Basic Three.js setup
    //this.createHtmlElement();
    this.container = element[0];

    this.createScene();

    this.createRenderer();

    window.addEventListener('resize', function () {
        thisRef.onWindowResize();
    }, false);

    this.loadDoorModel(productId, attributeId, isRal, inverted, holesOffsetsY, rightSide, dimensions, horizontalTexture);
};

Panoteq3dViewer.prototype.animate = function () {
    var thisRef = this;
//                requestAnimationFrame(function () {
//                    thisRef.animate();
//                });

//    var min_width = 347;
//    var max_width = 347 * 2;
//    var phase = 6;
//    var t = this.clock.getElapsedTime();

//    if (Math.floor(t) % 2 == 0) {
//        this.params.desiredWidth = 347 * 1;
//    } else {
//        this.params.desiredWidth = 347 * 2;
//    }

//                this.params.desiredWidth = (Math.sin((this.clock.getElapsedTime() % phase) / phase * Math.PI * 2) + 1) * 0.5 * (max_width - min_width) + min_width;
//                thisRef.scaleModelHorizontally();
    thisRef.render();
};

Panoteq3dViewer.prototype.resetCameraPosition = function () {
    this.debugLog('Reset camera ');
    this.controls.reset();
    this.autoPlaceCamera();
    this.render();
};

Panoteq3dViewer.prototype.autoPlaceCamera = function () {
    var BB = new THREE.Box3().setFromObject(this.params.middlePanel);
    var centerpoint = BB.getCenter();
    var size = BB.size();

    var totalHeight = this.params.middlePanel.origHeight * this.params.middlePanel.scale.y
        + this.params.topPanel.origHeight + this.params.bottomPanel.origHeight;
    var totalWidth = this.params.middlePanel.origWidth * this.params.middlePanel.scale.x
        + this.params.leftPanel.origWidth + this.params.rightPanel.origWidth;

    var aspect = this.renderer.getSize().width / this.renderer.getSize().height;

    var backupX = (totalHeight / 2) / Math.sin((this.camera.fov / 2) * (Math.PI / 180));
    var backupY = (totalWidth / aspect) / Math.sin(2 * (this.camera.fov / 2) * (Math.PI / 180));

    var camZposX = BB.max.z + backupX + this.camera.near;
    var camZposY = BB.max.z + backupY + this.camera.near;

    var camZfactor = 1.0;
    var camZpos = Math.max(camZposX, camZposY) * camZfactor;

    camZpos *= this.backSideView ? -1 : 1;
    this.debugLog('New camera position: (' + centerpoint.x + '; ' + centerpoint.y + '; ' + camZpos);

    this.camera.position.set(centerpoint.x, centerpoint.y, camZpos);
    //this.camera.far = this.camera.near + 10 * size.z;
    this.camera.updateProjectionMatrix();
    this.controls.update();
};

Panoteq3dViewer.prototype.hideModelWhileLoading = function () {
    this.camera.far = 1;
    this.camera.updateProjectionMatrix();
    this.render();
};

Panoteq3dViewer.prototype.showModelAfterLoading = function () {
    this.camera.far = 100;
    this.camera.updateProjectionMatrix();
    this.render();
};

Panoteq3dViewer.prototype.mapValue = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

Panoteq3dViewer.prototype.readjustBackgroundColorAccordingToCameraAngle = function () {
    var vector = new THREE.Vector3(0, 0, 0);
    this.camera.getWorldDirection(vector);
    var theta = Math.atan2(vector.x, vector.z);
    theta = Math.min(Math.max(0, Math.abs(theta)), 3.14);
    var mappedValueLuminance = Math.round(this.mapValue(theta, 0, 3.14, 90, 98));
    var mappedValueSaturation = Math.round(this.mapValue(theta, 0, 3.14, 7, 17));
    this.scene.background = new THREE.Color("hsl(60, " + mappedValueSaturation + "%, " + mappedValueLuminance + "%)")
}

Panoteq3dViewer.prototype.render = function () {
    this.readjustBackgroundColorAccordingToCameraAngle()
    this.renderer.render(this.scene, this.camera);
};

Panoteq3dViewer.prototype.onWindowResize = function () {
    var width = $(this.container).width();
    var height = $(this.container).height();

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);

    this.autoPlaceCamera();

    this.render();
};
