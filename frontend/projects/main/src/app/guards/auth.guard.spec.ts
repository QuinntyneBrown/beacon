import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { SESSION_SERVICE } from 'domain';
import { authGuard } from './auth.guard';

function runGuard(): boolean | UrlTree {
  return TestBed.runInInjectionContext(() =>
    authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
  ) as boolean | UrlTree;
}

describe('authGuard', () => {
  it('allows navigation when the session is authenticated', () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: SESSION_SERVICE,
          useValue: { isAuthenticated: signal(true) }
        }
      ]
    });

    expect(runGuard()).toBe(true);
  });

  it('redirects to /sign-in when the session is not authenticated', () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: SESSION_SERVICE,
          useValue: { isAuthenticated: signal(false) }
        }
      ]
    });

    const result = runGuard();
    const router = TestBed.inject(Router);
    expect(result).toEqual(router.parseUrl('/sign-in'));
  });
});
