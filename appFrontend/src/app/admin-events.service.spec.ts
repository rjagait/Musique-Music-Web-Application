import { TestBed } from "@angular/core/testing";

import { AdminEventsService } from "./admin-events.service";

describe("AdminEventsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AdminEventsService = TestBed.get(AdminEventsService);
    expect(service).toBeTruthy();
  });
});
