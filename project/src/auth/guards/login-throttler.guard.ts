import { ExecutionContext } from "@nestjs/common";
import { ThrottlerException, ThrottlerGuard, ThrottlerLimitDetail } from "@nestjs/throttler";

export class LoginThrottlerGuard extends ThrottlerGuard{
    protected async getTracker(req: Record<string, any>): Promise<string>{
        const email = req.body?.email || 'dummy'
        return `login-${email}`
    }

    // set limit to 5 attempt
    protected getLimit(): Promise<number>{
        return Promise.resolve(5)
    }

    protected getTtl(): Promise<number>{
        return Promise.resolve(60000)
    }

    protected async throwThrottlingException(): Promise<void> {
        throw new ThrottlerException(`Too many attempts. Please try again in 1 min`)
    }
}