import { Recovery } from '@prisma/client';
import { RecoveryTokenDTO } from './types';

export function toRecoveryTokenDTO(recovery: Recovery): RecoveryTokenDTO {
	return { id: recovery.id };
}
