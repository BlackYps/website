module.exports = {
    js: {
        files: {
            'public/js/bottom.min.js': [
                'public/js/jquery/jquery-1.11.3.min.js',
                'public/js/bootstrap/bootstrap-3.3.5.min.js'
            ],
            'public/js/calendar.min.js': [
                'node_modules/moment/min/moment-with-locales.min.js',
                'node_modules/fullcalendar/dist/fullcalendar.min.js',
                'node_modules/fullcalendar/dist/gcal.js',
                'node_modules/bootstrap-switch/dist/js/bootstrap-switch.min.js',
                'public/js/app/calendar.js'
            ]
        },
    }
};
