'use strict';
module.exports = function(params){

    return (function(){

        var emailConfig = {
            'DOMAIN'        : 'emprendemdz.com',
            'HOST'          : 'smtp.zoho.com',
            'INFO_ADDRESS'  : 'info@emprendemdz.com',
            'PASSWORD'      : 'emprendemdz2016$',
            'USER'          : 'info@emprendemdz.com'
        };

        emailConfig.TRANSPORT = params.nodemailer.createTransport(params.smtpPool({
            secure : true,
            auth    : {
                pass  : emailConfig.PASSWORD,
                user  : emailConfig.USER
            },
            domain  : emailConfig.DOMAIN,
            host    : emailConfig.HOST,
            port    : 465
        }));

        emailConfig.TRANSPORT.use('compile',
            params.emailhbs({
                viewEngine    : params.hbs.create({
                    layoutsDir  : './assets/email',
                    partialsDir : './assets/email/partials'
                }),
                viewPath      : './assets/email'
            })
        );

        return emailConfig;

    })();

};