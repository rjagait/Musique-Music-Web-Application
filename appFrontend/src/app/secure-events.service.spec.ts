import { TestBed } from "@angular/core/testing";

import { SecureEventsService } from "./secure-events.service";

describe("SecureEventsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: SecureEventsService = TestBed.get(SecureEventsService);
    expect(service).toBeTruthy();
  });
});
