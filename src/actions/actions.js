export const SHOW_BADGE_UPLOAD_FORM = 'SHOW_BADGE_UPLOAD_FORM';
export const SHOW_PARKING_MAP = 'SHOW_PARKING_MAP';

export function showBadgeUploadForm() {
  return {
    type: SHOW_BADGE_UPLOAD_FORM,
  }
}

export function showParkingMap() {
  return {
    type: SHOW_PARKING_MAP,
  }
}