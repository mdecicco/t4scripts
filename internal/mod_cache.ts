class ModDataCache {
    private currentModId: string | null;
    private cache: { [modId: string]: any };

    constructor() {
        // todo
        // This class will keep track of any persistent mod data that should
        // stick around in between game sessions / runtime script recompilations

        this.currentModId = null;
        this.cache = {};
        this.deserialize();
    }

    private checkSerializable(data: any): boolean {
        if ((typeof data) === 'string') return true;
        else if ((typeof data) === 'boolean') return true;
        else if ((typeof data) === 'number') return true;
        else if ((typeof data) === 'undefined') return true;
        else if (Array.isArray(data)) {
            return !data.some(elem => !this.checkSerializable(elem));
        } else if ((typeof data) === 'object') {
            return !Object.getOwnPropertyNames(data).some(key => {
                if (!this.checkSerializable(key)) return true;
                if (!this.checkSerializable(data[key])) return true;

                return false;
            });
        }

        return false;
    }

    private deserialize() {
        const cachePath = `${t4.gameDirectory}/scripts/mod-cache.json`;
        if (!fs.exists(cachePath)) return;
        
        try {
            const cacheBuf = fs.bufferFromFile(cachePath, fs.OpenMode.Text);
            if (!cacheBuf) {
                console.error('Failed to open mod cache file. See logs for more info probably');
                return;
            }

            const jsonStr = cacheBuf.readString(cacheBuf.getSize());
            try {
                this.cache = JSON.parse(jsonStr);
            } catch (err) {
                console.error('Failed to parse mod cache. Apparently it\'s not valid JSON');
            }

            fs.destroyBuffer(cacheBuf);
        } catch (err) {
            console.error('Failed to read mod cache from file. See logs for more info probably');
        }
    }

    private serialize() {
        const dataStr = JSON.stringify(this.cache);
        const out = fs.createBuffer(dataStr.length);

        try {
            if (!out.writeString(dataStr)) {
                console.error('Failed to write serialized mod cache to buffer. See logs for more info probably');
                fs.destroyBuffer(out);
                return;
            }

            if (!out.saveToFile(`${t4.gameDirectory}/scripts/mod-cache.json`)) {
                console.error('Failed to save mod cache to file. See logs for more info probably');
                fs.destroyBuffer(out);
                return;
            }
        } catch (err) {
            console.error('Caught exception while serializing mod cache...');
            console.error(err);
        }

        fs.destroyBuffer(out);
    }

    setItem(field: string, data: any) {
        if (!this.currentModId) {
            throw `Cache.setItem: ModDataCache.currentModId was null... Either you're doing something weird or stinkee2 made a mistake`;
        }

        if (!this.checkSerializable(data)) {
            throw `Mod '${this.currentModId} called Cache.setItem with data that is not serializable. Check the docstring on Cache.setItem for more info.`;
        }

        if (!(this.currentModId in this.cache)) {
            this.cache[this.currentModId] = {
                [field]: data
            };
        } else {
            this.cache[this.currentModId][field] = data;
        }
    }

    getItem<T>(field: string, defaultValue: T) : T;
    getItem(field: string, defaultValue?: any) : any | null {
        if (!this.currentModId) {
            throw `Cache.setItem: ModDataCache.currentModId was null... Either you're doing something weird or stinkee2 made a mistake`;
        }

        if (this.currentModId in this.cache) {
            const modCache = this.cache[this.currentModId];
            if (field in modCache) {
                return modCache[field];
            }
        }

        if (defaultValue !== undefined) return defaultValue;
        return null;
    }
};

export const Cache = new ModDataCache();