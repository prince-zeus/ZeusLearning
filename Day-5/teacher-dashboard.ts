import data from './Data/courses.json';
import AleartNotificationData from './Data/aleart-notification-data.json';
import AnnouncementNotificationData from './Data/announcement-notification-data.json';

interface Course {
    card_image: string;
    card_title: string;
    subject: string;
    grade: string;
    grade_point: string;
    units: string;
    lessons: string;
    topics: string;
    card_select: string[];
    students: string;
    duration: string;
    is_expired: boolean;
}

interface Notification {
    pa: string;
    title: string;
    course: string;
    classes: string;
    time: string;
    attached_file_count: number;
    is_checked: boolean;
}

var cards = document.querySelector(".cards") as HTMLDivElement;
var result_count = document.querySelector(".result-count") as HTMLDivElement;
var aleart_dropdown_menu = document.querySelector(".aleart-dropdown-menu") as HTMLDivElement;
var announcement_dropdown_menu = document.querySelector(".announcement-dropdown-menu") as HTMLDivElement;

(function addCourses() {
    for (let course of data as Course[]) {
        let { card_image, card_title, subject, grade, grade_point, units, lessons, topics, card_select, students, duration, is_expired } = course;
        cards.innerHTML +=
            `<div class="card">
                <div class="expired ${is_expired ? "display" : ""}">EXPIRED</div>
                <div class="card-container">
                    <img src="${card_image}" alt="Card Image" class="card-image">
                    <div class="card-information">
                        <div class="flex">
                            <div class="card-title">${card_title}</div>
                            <img src="assets/icons/favourite.svg" alt="" class="card-star">
                        </div>
                        <div class="flex">${(subject.length > 0) ? subject : ""}${(grade.length > 0) ? ` | Grade ${grade}<span>+${grade_point}</span>` : ""}</div>
                        <div class="flex">${units.length > 0 ? `<b>${units}</b><span>Units</span>` : ""}${lessons.length > 0 ? `<b>${lessons}</b><span>Lessons</span>` : ""}${topics.length > 0 ? `<b>${topics}</b><span>Topics</span>` : ""}</div>
                        <select name="classes" id="classes" class="card-select">
                            ${Object.entries(card_select).map(([index, cs]) => `<option value="${index}">${cs}</option>`).join('')}
                        </select>
                        <div class="flex">${(students.length > 0) ? `${students} Students` : ""}${(duration.length > 0) ? ` | ${duration}` : ""}</div>
                    </div>
                </div>
                <div class="horizontal-line"></div>
                <div class="card-actions">
                    <img src="assets/icons/preview.svg" alt="" class="card-action">
                    <img src="assets/icons/manage course.svg" alt="" class="card-action ${duration.length === 0 ? "display-light" : ""}">
                    <img src="assets/icons/grade submissions.svg" alt="" class="card-action ${duration.length === 0 ? "display-light" : ""}">
                    <img src="assets/icons/reports.svg" alt="" class="card-action">
                </div>
            </div>`;
    }
})();

(function showCoursesCount() {
    result_count.innerHTML = `Showing ${Math.min(data.length, 10)} of ${data.length} courses`;
})();

(function showAleartNotifications() {
    for (let notification of AleartNotificationData as Notification[]) {
        let { title, course, classes, time, is_checked } = notification;
        let imagePath = (is_checked) ? "assets/icons/check-round.svg" : "assets/icons/dash-circle.svg";
        aleart_dropdown_menu.innerHTML +=
            `<div class="notification-container ${(is_checked) ? "is-checked" : ""}">
                <img class="notification-status" src="${imagePath}" alt="Check Logo">
                <div class="notification-title">
                    ${title}
                </div>
                ${course.length > 0 ? `<div class="notification-category">Course: ${course}</div>` : ``}
                ${classes.length > 0 ? `<div class="notification-category">Class: ${classes}</div>` : ``}
                <div class="notification-data">
                    <div class="notification-time">
                        ${time}
                    </div>
                </div>
            </div>`;
    }
})();

(function showAnnouncementNotifications() {
    for (let notification of AnnouncementNotificationData as Notification[]) {
        let { pa, title, course, classes, attached_file_count, time, is_checked } = notification;
        let imagePath = (is_checked) ? "assets/icons/check-round.svg" : "assets/icons/dash-circle.svg";
        announcement_dropdown_menu.innerHTML +=
            `<div class="notification-container ${(is_checked) ? "is-checked" : ""}">
                <img class="notification-status" src="${imagePath}" alt="Check Logo">
                <div class="notification-pa">
                    PA:<span>${pa}</span>
                </div>
                <div class="notification-title">
                    ${title}
                </div>
                ${course.length > 0 ? `<div class="notification-category">Course: ${course}</div>` : ``}
                ${classes.length > 0 ? `<div class="notification-category">Class: ${classes}</div>` : ``}
                <div class="notification-data">
                    ${attached_file_count > 0 ? `<div class="notification-is-file-attached">
                        <img src="assets/icons/attach-file.svg" alt="Attach File Logo">${attached_file_count} files are attached
                    </div>` : ``}
                    <div class="notification-time">
                        ${time}
                    </div>
                </div>
            </div>`;
    }
})();
