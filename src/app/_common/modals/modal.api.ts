export interface ModalContent {
  onClose?: () => boolean;
  onShow(): boolean;
}
