export const SHOW_HOME = 'SHOW_HOME';
export const SHOW_BADGES_LIST = 'SHOW_BADGES_LIST';
export const SHOW_BADGE_UPLOAD_FORM = 'SHOW_BADGE_UPLOAD_FORM';
export const SHOW_PARKING_MAP = 'SHOW_PARKING_MAP';

export function showHome() {
  return {
    type: SHOW_HOME,
  };
}

export function showBadgesList() {
  return {
    type: SHOW_BADGES_LIST,
  };
}

export function showBadgeUploadForm() {
  return {
    type: SHOW_BADGE_UPLOAD_FORM,
  };
}

export function showParkingMap() {
  return {
    type: SHOW_PARKING_MAP,
  };
}
