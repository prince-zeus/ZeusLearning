"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
var courses_json_1 = require("./Data/courses.json");
var aleart_notification_data_json_1 = require("./Data/aleart-notification-data.json");
var announcement_notification_data_json_1 = require("./Data/announcement-notification-data.json");
var cards = document.querySelector(".cards");
var result_count = document.querySelector(".result-count");
var aleart_dropdown_menu = document.querySelector(".aleart-dropdown-menu");
var announcement_dropdown_menu = document.querySelector(".announcement-dropdown-menu");
(function addCourses() {
    for (var _i = 0, _a = courses_json_1.default; _i < _a.length; _i++) {
        var course = _a[_i];
        var card_image = course.card_image, card_title = course.card_title, subject = course.subject, grade = course.grade, grade_point = course.grade_point, units = course.units, lessons = course.lessons, topics = course.topics, card_select = course.card_select, students = course.students, duration = course.duration, is_expired = course.is_expired;
        cards.innerHTML +=
            "<div class=\"card\">\n                <div class=\"expired ".concat(is_expired ? "display" : "", "\">EXPIRED</div>\n                <div class=\"card-container\">\n                    <img src=\"").concat(card_image, "\" alt=\"Card Image\" class=\"card-image\">\n                    <div class=\"card-information\">\n                        <div class=\"flex\">\n                            <div class=\"card-title\">").concat(card_title, "</div>\n                            <img src=\"assets/icons/favourite.svg\" alt=\"\" class=\"card-star\">\n                        </div>\n                        <div class=\"flex\">").concat((subject.length > 0) ? subject : "").concat((grade.length > 0) ? " | Grade ".concat(grade, "<span>+").concat(grade_point, "</span>") : "", "</div>\n                        <div class=\"flex\">").concat(units.length > 0 ? "<b>".concat(units, "</b><span>Units</span>") : "").concat(lessons.length > 0 ? "<b>".concat(lessons, "</b><span>Lessons</span>") : "").concat(topics.length > 0 ? "<b>".concat(topics, "</b><span>Topics</span>") : "", "</div>\n                        <select name=\"classes\" id=\"classes\" class=\"card-select\">\n                            ").concat(Object.entries(card_select).map(function (_a) {
                var index = _a[0], cs = _a[1];
                return "<option value=\"".concat(index, "\">").concat(cs, "</option>");
            }).join(''), "\n                        </select>\n                        <div class=\"flex\">").concat((students.length > 0) ? "".concat(students, " Students") : "").concat((duration.length > 0) ? " | ".concat(duration) : "", "</div>\n                    </div>\n                </div>\n                <div class=\"horizontal-line\"></div>\n                <div class=\"card-actions\">\n                    <img src=\"assets/icons/preview.svg\" alt=\"\" class=\"card-action\">\n                    <img src=\"assets/icons/manage course.svg\" alt=\"\" class=\"card-action ").concat(duration.length === 0 ? "display-light" : "", "\">\n                    <img src=\"assets/icons/grade submissions.svg\" alt=\"\" class=\"card-action ").concat(duration.length === 0 ? "display-light" : "", "\">\n                    <img src=\"assets/icons/reports.svg\" alt=\"\" class=\"card-action\">\n                </div>\n            </div>");
    }
})();
(function showCoursesCount() {
    result_count.innerHTML = "Showing ".concat(Math.min(courses_json_1.default.length, 10), " of ").concat(courses_json_1.default.length, " courses");
})();
(function showAleartNotifications() {
    for (var _i = 0, _a = aleart_notification_data_json_1.default; _i < _a.length; _i++) {
        var notification = _a[_i];
        var title = notification.title, course = notification.course, classes = notification.classes, time = notification.time, is_checked = notification.is_checked;
        var imagePath = (is_checked) ? "assets/icons/check-round.svg" : "assets/icons/dash-circle.svg";
        aleart_dropdown_menu.innerHTML +=
            "<div class=\"notification-container ".concat((is_checked) ? "is-checked" : "", "\">\n                <img class=\"notification-status\" src=\"").concat(imagePath, "\" alt=\"Check Logo\">\n                <div class=\"notification-title\">\n                    ").concat(title, "\n                </div>\n                ").concat(course.length > 0 ? "<div class=\"notification-category\">Course: ".concat(course, "</div>") : "", "\n                ").concat(classes.length > 0 ? "<div class=\"notification-category\">Class: ".concat(classes, "</div>") : "", "\n                <div class=\"notification-data\">\n                    <div class=\"notification-time\">\n                        ").concat(time, "\n                    </div>\n                </div>\n            </div>");
    }
})();
(function showAnnouncementNotifications() {
    for (var _i = 0, _a = announcement_notification_data_json_1.default; _i < _a.length; _i++) {
        var notification = _a[_i];
        var pa = notification.pa, title = notification.title, course = notification.course, classes = notification.classes, attached_file_count = notification.attached_file_count, time = notification.time, is_checked = notification.is_checked;
        var imagePath = (is_checked) ? "assets/icons/check-round.svg" : "assets/icons/dash-circle.svg";
        announcement_dropdown_menu.innerHTML +=
            "<div class=\"notification-container ".concat((is_checked) ? "is-checked" : "", "\">\n                <img class=\"notification-status\" src=\"").concat(imagePath, "\" alt=\"Check Logo\">\n                <div class=\"notification-pa\">\n                    PA:<span>").concat(pa, "</span>\n                </div>\n                <div class=\"notification-title\">\n                    ").concat(title, "\n                </div>\n                ").concat(course.length > 0 ? "<div class=\"notification-category\">Course: ".concat(course, "</div>") : "", "\n                ").concat(classes.length > 0 ? "<div class=\"notification-category\">Class: ".concat(classes, "</div>") : "", "\n                <div class=\"notification-data\">\n                    ").concat(attached_file_count > 0 ? "<div class=\"notification-is-file-attached\">\n                        <img src=\"assets/icons/attach-file.svg\" alt=\"Attach File Logo\">".concat(attached_file_count, " files are attached\n                    </div>") : "", "\n                    <div class=\"notification-time\">\n                        ").concat(time, "\n                    </div>\n                </div>\n            </div>");
    }
})();
