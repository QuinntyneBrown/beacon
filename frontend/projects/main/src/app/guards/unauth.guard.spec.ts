import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { SESSION_SERVICE } from 'domain';
import { unauthGuard } from './unauth.guard';

function runGuard(): boolean | UrlTree {
  return TestBed.runInInjectionContext(() =>
    unauthGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
  ) as boolean | UrlTree;
}

describe('unauthGuard', () => {
  it('allows navigation when the visitor is signed out', () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: SESSION_SERVICE,
          useValue: { isAuthenticated: signal(false) }
        }
      ]
    });

    expect(runGuard()).toBe(true);
  });

  it('redirects authenticated users to /boards', () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: SESSION_SERVICE,
          useValue: { isAuthenticated: signal(true) }
        }
      ]
    });

    const result = runGuard();
    const router = TestBed.inject(Router);
    expect(result).toEqual(router.parseUrl('/boards'));
  });
});
