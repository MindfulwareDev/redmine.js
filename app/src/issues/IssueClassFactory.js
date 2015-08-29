/*!
 * Redmine.js
 * @license GPLv2
 */
(function(){
  'use strict';

  angular
        .module('rmIssues')
        .factory('IssueClassFactory', IssueClassFactory);

  function IssueClassFactory() {
      var _icon = {
          'Bug': {
              icon: 'bug_report'
          },
          'Feature': {
              icon: 'description'
          },
          'Task': {
              icon: 'class'
          },
          'Deliverable': {
              icon: ''
          }
      };

      function _getIcon(issue) {
          if (!issue || !issue.tracker) {
              console.error('cannot get icon');
              console.log(issue);
              return '';
          }

          var _i = _icon[issue.tracker.name] ? _icon[issue.tracker.name] : '';

          if (_i == '')
              console.log("no icon for " + issue.tracker.name);

          return _i;
      }

      function getIcon(issue) {
          var _i = _getIcon(issue);

          return _i == '' ? '' : _i.icon;
      }

      function getTrackerClass(issue) {
          return issue.tracker ? 'issue-tracker-' + issue.tracker.name.toLowerCase() : '';
      }

      function getPriorityClass(issue) {
          return 'issue-priority-' + issue.priority.name.toLowerCase();
      }

      return {
          getIcon: getIcon,
          getTrackerClass: getTrackerClass,
          getPriorityClass: getPriorityClass
      };
  }

})();