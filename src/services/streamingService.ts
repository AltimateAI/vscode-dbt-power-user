import { AltimateRequest } from "../altimate";
import { SharedStateService } from "./sharedStateService";

export class StreamingService {
  public constructor(
    private altimateRequest: AltimateRequest,
    private emitterService: SharedStateService,
  ) {}

  public async fetchAsStream<R>({
    endpoint,
    syncRequestId,
    request,
  }: {
    endpoint: string;
    request: R;
    syncRequestId?: string;
  }) {
    const response = await this.altimateRequest.fetchAsStream<R>(
      endpoint,
      request,
      (chunk: string) => {
        this.emitterService.fire({
          command: "stream:chunk",
          payload: {
            syncRequestId,
            body: { chunk },
            status: true,
          },
        });
      },
    );

    return response;
  }
}
