/*
 * =======================================================
 * 앱스스크립트 부가기능 ui 핸들링 관련 함수
 * =======================================================
 * */

/**
 * HTML로 만든 사이드바를 보여주는 함수입니다.
 */
function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('index').setTitle('Sample Title')
  SpreadsheetApp.getUi().showSidebar(html)
}

/**
 * 사이드바를 오픈하는 함수
 * */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('addon').addItem('Launch Sidebar', 'showSidebar').addToUi()
}
