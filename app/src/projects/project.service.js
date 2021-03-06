/*!
 * Redmine.js
 * @license GPLv2
 */
(function(){
    'use strict';

    angular
        .module('rmProjects')
        .service('projectService', [
            '$resource',
            '$cacheFactory',
            'settingsService',
            ProjectService]);

    function ProjectService( $resource, $cacheFactory, settingsService ) {
        var apiRemoteUrl, apiKey, url, resource;
        var relative = '/projects/:project_id/:query.json';
        var params = {};
        var cache = $cacheFactory('projectCache');

        // project statuses from trunk/app/helpers/admin_helper.rb
        var project_status = {
            active: 1,
            closed: 5,
            archived: 9
        };

        function createResource() {
            var url = apiRemoteUrl + relative;
            var actions = {
                get: {
                    method: 'GET',
                    params: {'include': 'issue_categories,trackers'},
                    isArray: false,
                    cache: cache,
                    timeout: 10000,
                    headers: {
                        'X-Redmine-API-Key': apiKey,
                    }
                }
            };
            cache.removeAll();
            return $resource(url, params, actions);
        }

        function getResource() {
            if (apiRemoteUrl !== settingsService.getRemoteUrl()) {
                apiRemoteUrl = settingsService.getRemoteUrl();
                resource = null;
            }
            if (apiKey !== settingsService.getApiKey()) {
                apiKey = settingsService.getApiKey();
                resource = null;
            }
            if (!resource)
                resource = createResource();
            return resource;
        }

        return {
            get: function() {
                return getResource().get.apply(this, arguments);
            },
            get_status_name: function(status) {
                for (var k in project_status)
                    if (project_status[k] == status)
                        return k;
                return '';
            },
            project_status: project_status
        };
    }

})();
