

export default class Requester{

    opts;
    url;
    stop;
    timeout;

    constructor(url, opts=null){
        this.url = url
        this.opts = opts
        this.stop = false;
        if(opts.timeout)
            this.timeout = this.opts.timeout
        else
            this.timeout = 60000;
    }

    configBuilder = () => {

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


    run(){
        this.stop = false;
        this.runThread();
    }
    runThread(){

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

    stop(){
        this.stop = true;
    }

}