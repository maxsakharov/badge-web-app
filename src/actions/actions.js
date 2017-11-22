export const SHOW_BADGE_UPLOAD_FORM = 'SHOW_BADGE_UPLOAD_FORM';
export const HIDE_BADGE_UPLOAD_FORM = 'HIDE_BADGE_UPLOAD_FORM';

export function showBadgeUploadForm() {
  return {
    type: SHOW_BADGE_UPLOAD_FORM,
  }
}

export function hideBadgeUploadForm() {
  return {
    type: HIDE_BADGE_UPLOAD_FORM,
  }
}