_CommonGet = CommonGet
CommonGet = function(Path, Callback, RetriesLeft) {
    return _CommonGet(remap(Path), Callback, RetriesLeft);
}

// Image.crossOrigin has to be set before Image.url, otherwise we could just delegate these
function GLDrawLoadImage(gl, url) {
    url = remap(url);

    let textureInfo = gl.textureCache.get(url);

    if (!textureInfo) {
        const tex = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, tex);
        /** @type { { width: number; height: number; texture: WebGLTexture; } } */
        textureInfo = { width: 1, height: 1, texture: tex, };
        gl.textureCache.set(url, textureInfo);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        let Img = GLDrawImageCache.get(url);

        if (Img) {
            GLDrawBingImageToTextureInfo(gl, Img, textureInfo);
        } else {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
            Img = new Image();
            GLDrawImageCache.set(url, Img);

            ++GLDrawCacheTotalImages;
            Img.addEventListener('load', function () {
                GLDrawBingImageToTextureInfo(gl, Img, textureInfo);
                ++GLDrawCacheLoadedImages;
                if (GLDrawCacheLoadedImages == GLDrawCacheTotalImages) { Player.MustDraw = true; CharacterLoadCanvasAll(); }
            });
            Img.addEventListener('error', function () {
                if (Img.errorcount == null) Img.errorcount = 0;
                Img.errorcount += 1;
                if (Img.errorcount < 3) {
                    // eslint-disable-next-line no-self-assign
                    Img.crossOrigin = "Anonymous";
                    Img.src = Img.src;
                } else {
                    console.log("Error loading image " + Img.src);
                    ++GLDrawCacheLoadedImages;
                    if (GLDrawCacheLoadedImages == GLDrawCacheTotalImages) CharacterLoadCanvasAll();
                }
            });
            Img.crossOrigin = "Anonymous";
            Img.src = url;
        }
    }
    return textureInfo;
}

DrawGetImage = function(Source) {
    Source = remap(Source);
    // Search in the cache to find the image and make sure this image is valid
    let Img = DrawCacheImage.get(Source);
    if (!Img) {
        Img = new Image;
        DrawCacheImage.set(Source, Img);
        // Keep track of image load state
        const IsAsset = (Source.indexOf("Assets") >= 0);
        if (IsAsset) {
            ++DrawCacheTotalImages;
            Img.addEventListener("load", function () {
                DrawGetImageOnLoad();
            });
        }

        Img.addEventListener("error", function () {
            DrawGetImageOnError(Img, IsAsset);
        });

        // Start loading
        Img.crossOrigin = "Anonymous";
        Img.src = Source;
    }

    // returns the final image
    return Img;
}

AudioPlayInstantSound = function(src, volume) {
    const vol = volume != null ? volume : Player.AudioSettings.Volume;
    if (vol > 0) {
        var audio = new Audio();
        audio.crossOrigin = "Anonymous";
        audio.src = remap(src);
        audio.volume = Math.min(vol, 1);
        audio.play();
    }
}