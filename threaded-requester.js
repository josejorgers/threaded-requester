

export default class Requester{

    constructor(url, opts=null){
        this.url = url
        this.opts = opts
        this.stop = false;
        if(opts.timeout)
            this.timeout = this.opts.timeout
        else
            this.timeout = 60000;
        
        this.configBuilder = () => {

            let settings = {
                method: 'GET'
            };
    
            if(this.opts.method)
                settings.method = this.opts.method
            if(this.opts.headers)
                settings.headers = this.opts.headers
            if(this.opts.body)
                settings.body = this.opts.body
    
            return settings
        }

        this.run = () => {
            this.stop = false;
            this.runThread();
        }

        this.runThread = () => {
    
            if(this.stop)
                return;
            const settings = this.configBuilder();
            setTimeout(() => fetch(this.url, settings)
                                .then(result => this.opts.callback ? this.opts.callback(result) : null)
                                .then(() => this.runThread())
                                .catch(result => {
                                    if(this.opts.failure)
                                        this.opts.failure(result)
                                    this.runThread()
                                }), this.timeout)
        }

        this.stop = () => {
            this.stop = true;
        }
    }
}